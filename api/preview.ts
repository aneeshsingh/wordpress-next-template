import type { NextApiRequest, NextApiResponse } from "next";
import { getPreviewPost } from "@/app/lib/api";

export default async function preview(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  const { secret, id, slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
      !process.env.WORDPRESS_PREVIEW_SECRET ||
      secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
      (!id && !slug)
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Ensure id and slug are strings
  const postId = Array.isArray(id) ? id[0] : id || '';
  const postSlug = Array.isArray(slug) ? slug[0] : slug || '';

  // Ensure either postId or postSlug is provided
  if (!postId && !postSlug) {
    return res.status(400).json({ message: "Missing id or slug" });
  }

  // Determine the ID type
  const idType = postId ? "DATABASE_ID" : "SLUG";

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const post = await getPreviewPost(postId || postSlug, idType);

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Post not found" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      id: post.databaseId,
      slug: post.slug,
      status: post.status,
    },
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/posts/${post.slug || post.databaseId}` });
  res.end();
}
