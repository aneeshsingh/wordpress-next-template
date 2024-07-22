import { notFound } from "next/navigation";
import Container from "@/app/components/container";
import PostBody from "@/app/components/post-body";
import MoreStories from "@/app/components/more-stories";
import Header from "@/app/components/header";
import PostHeader from "@/app/components/post-header";
import SectionSeparator from "@/app/components/section-separator";
import Layout from "@/app/components/layout";
import Tags from "@/app/components/tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/app/lib/api"; // Import the function here
import { CMS_NAME } from "@/app/lib/constants";

export async function generateStaticParams() {
    const allPosts = await getAllPostsWithSlug();
    return allPosts.edges.map(({ node }) => ({
        slug: node.slug,
    }));
}

export default async function PostPage({ params }) {
    const { slug } = params;
    const data = await getPostAndMorePosts(slug, false, null);

    if (!data.post) {
        notFound();
    }

    const { post, posts } = data;
    const morePosts = posts?.edges;

    return (
        <Layout preview={false}>
            <Container>
                <Header />
                <article>
                    <PostHeader
                        title={post.title}
                        coverImage={post.featuredImage}
                        date={post.date}
                        author={post.author}
                        categories={post.categories}
                    />
                    <PostBody content={post.content} />
                    <footer>
                        {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                    </footer>
                </article>

                <SectionSeparator />
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </Layout>
    );
}
