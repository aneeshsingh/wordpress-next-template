// src/app/lib/api.ts

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  if (!API_URL) {
    throw new Error("API_URL is not defined. Please set WORDPRESS_API_URL in your environment variables.");
  }

  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

type IdType = "DATABASE_ID" | "SLUG";

export async function getPreviewPost(id: string, idType: IdType = "DATABASE_ID") {
  const data = await fetchAPI(
      `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
      {
        variables: { id, idType },
      }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPostsForHome(preview: boolean) {
  const data = await fetchAPI(
      `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
      {
        variables: {
          onlyEnabled: !preview,
          preview,
        },
      }
  );

  return data?.posts;
}

interface PostPreview {
  id: number;
  slug: string;
  status: string;
}

interface PreviewData {
  post?: PostPreview;
}

export async function getPostAndMorePosts(
    slug: string,
    preview: boolean,
    previewData: PreviewData | null
) {
  const postPreview = preview && previewData ? previewData.post : undefined;

  if (!postPreview && preview) {
    throw new Error('Post preview data is not available');
  }

  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId ? Number(slug) === postPreview?.id : slug === postPreview?.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";

  const data = await fetchAPI(
      `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
          isRevision
              ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
              : ""
      }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
      {
        variables: {
          id: isDraft ? postPreview.id : slug,
          idType: isDraft ? "DATABASE_ID" : "SLUG",
        },
      }
  );

  if (isDraft) data.post.slug = postPreview.id;
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  data.posts.edges = data.posts.edges.filter(
      ({ node }: { node: { slug: string } }) => node.slug !== slug
  );
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

export interface Author {
  name: string;
  firstName: string;
  lastName: string;
  avatar: {
    url: string;
  };
}

export interface CoverImage {
  node: {
    sourceUrl: string;
  };
}

export interface PostNode {
  title: string;
  featuredImage: CoverImage;
  date: string;
  author: Author;
  slug: string;
  excerpt: string;
}

export interface AllPostsData {
  edges: { node: PostNode }[];
}

export interface PostNode {
  slug: string;
}

export interface AllPostsWithSlug {
  edges: Array<{ node: PostNode }>;
}
