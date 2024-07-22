import Head from "next/head";
import Container from "@/app/components/container";
import MoreStories from "@/app/components/more-stories";
import HeroPost from "@/app/components/hero-post";
import Intro from "@/app/components/intro";
import Layout from "@/app/components/layout";
import { getAllPostsForHome } from "@/app/lib/api";
import { CMS_NAME } from "@/app/lib/constants";

// Define the Page component as a server component
export default async function Page({ preview }) {
    const allPosts = await getAllPostsForHome(preview);
    const edges = allPosts.edges;
    const heroPost = edges[0]?.node;
    const morePosts = edges.slice(1);

    return (
        <Layout preview={preview}>
            <Head>
                <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
            </Head>
            <Container>
                <Intro />
                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.featuredImage}
                        date={heroPost.date}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                    />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </Layout>
    );
}

// Define the dynamic parameters if needed
export async function generateStaticParams() {
    const allPosts = await getAllPostsForHome(false);
    return allPosts.edges.map(({ node }) => ({
        slug: node.slug,
    }));
}
