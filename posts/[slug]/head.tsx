import { fetchPostData } from "./fetchPostData";
import { CMS_NAME } from "@/app/lib/constants";

export default async function Head({ params }) {
    const { slug } = params;
    const data = await fetchPostData(slug);

    if (!data.post) {
        return (
            <>
                <title>Not Found | Next.js Blog Example</title>
            </>
        );
    }

    const { post } = data;

    return (
        <>
            <title>{`${post.title} | Next.js Blog Example with ${CMS_NAME}`}</title>
            <meta property="og:image" content={post.featuredImage?.node.sourceUrl} />
        </>
    );
}
