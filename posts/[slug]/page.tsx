// src/app/posts/[slug]/page.tsx

import { notFound } from "next/navigation";
import Container from "@/app/components/container";
import PostBody from "@/app/components/post-body";
import MoreStories from "@/app/components/more-stories";
import Header from "@/app/components/header";
import PostHeader from "@/app/components/post-header";
import SectionSeparator from "@/app/components/section-separator";
import Layout from "@/app/components/layoutcomponent";
import Tags from "@/app/components/tags";
import { getAllPostsWithSlug, getPostAndMorePosts, PostNode, AllPostsWithSlug } from "@/app/lib/api";
import { CMS_NAME } from "@/app/lib/constants";

interface Params {
    slug: string;
}

export async function generateStaticParams() {
    const allPosts: AllPostsWithSlug = await getAllPostsWithSlug();
    return allPosts.edges.map(({ node }: { node: PostNode }) => ({
        slug: node.slug,
    }));
}
const DEFAULT_COVER_IMAGE_URL = 'https://dev.alkye.com/wp-content/uploads/2023/08/chris-lynch-Qruwi3Ur3Ak-unsplash-1.webp';

export default async function PostPage({ params }: { params: Params }) {
    const { slug } = params;
    const data = await getPostAndMorePosts(slug, false, null);

    if (!data?.post) {
        notFound();
    }

    const { post, posts } = data;
    const morePosts = posts?.edges ?? [];

    console.log('Post Data:', post);
    console.log('More Posts Data:', morePosts);

    return (
        <Layout preview={false}>
            <Container>
                <Header />
                <article>
                    <PostHeader
                        title={post?.title || ''}
                        coverImage={post?.featuredImage.node.sourceUrl || DEFAULT_COVER_IMAGE_URL}
                        date={post?.date || ''}
                        author={post?.author || null}
                        categories={post?.categories || null}
                    />
                    <PostBody content={post?.content || ''} />
                    <footer>
                        {post?.tags?.edges?.length > 0 && <Tags tags={post.tags} />}
                    </footer>
                </article>

                <SectionSeparator />
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </Layout>
    );
}
