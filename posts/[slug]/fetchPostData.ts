import { getPostAndMorePosts } from "@/app/lib/api";

export async function fetchPostData(slug: string) {
    const data = await getPostAndMorePosts(slug, false, null);
    return data;
}
