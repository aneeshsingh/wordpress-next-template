// src/app/page.tsx
import { Metadata } from 'next'
import Container from "@/app/components/container";
import MoreStories from "@/app/components/more-stories";
import HeroPost from "@/app/components/hero-post";
import Intro from "@/app/components/intro";
import Layout from "@/app/components/layoutcomponent";
import { getAllPostsForHome } from "@/app/lib/api";
import { CMS_NAME } from "@/app/lib/constants";
import { AllPostsData, PostNode } from "@/app/lib/api"; // Adjust the import path as needed
export const metadata: Metadata = {
    title: `Next.js Blog Example with ${CMS_NAME}`,
}

// Define the props type
type PageProps = {
    params: {
        preview: boolean;
    };
};

// Define the Page component as a server component with proper props type
const Page = async ({ params }: PageProps) => {
    const { preview } = params;
    const allPosts = await getAllPostsForHome(preview);
    const edges = allPosts.edges;
    const heroPost = edges[0]?.node;
    const morePosts = edges.slice(1);

    return (
        <Layout preview={preview}>
            <Container>
                <Intro />
                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.featuredImage}
                        dateString={heroPost.date} // Adjusted to match HeroPostProps
                        excerpt={heroPost.excerpt}
                        author={heroPost.author}
                        slug={heroPost.slug}
                    />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </Layout>
    );
};

// Define the dynamic parameters if needed
export async function generateStaticParams() {
    const allPosts: AllPostsData = await getAllPostsForHome(false);

    return allPosts.edges.map(({ node }: { node: PostNode }) => ({
        slug: node.slug,
    }));
}
export default Page;
