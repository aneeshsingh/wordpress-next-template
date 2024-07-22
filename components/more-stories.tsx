import React from "react";
import PostPreview from "@/app/components/post-preview";

type PostNode = {
    title: string;
    featuredImage: any; // You can define a more specific type if you have it
    date: string;
    author: any; // You can define a more specific type if you have it
    slug: string;
    excerpt: string;
};

type PostEdge = {
    node: PostNode;
};

type MoreStoriesProps = {
    posts: PostEdge[];
};

export default function MoreStories({ posts }: MoreStoriesProps) {
    return (
        <section>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                More Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {posts.map(({ node }) => (
                    <PostPreview
                        key={node.slug}
                        title={node.title}
                        coverImage={node.featuredImage}
                        date={node.date}
                        author={node.author}
                        slug={node.slug}
                        excerpt={node.excerpt}
                    />
                ))}
            </div>
        </section>
    );
}
