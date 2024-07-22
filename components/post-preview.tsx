import React from "react";
import Avatar from "@/app/components/avatar";
import Articledate from "@/app/components/articledate";
import CoverImage from "@/app/components/cover-image";
import Link from "next/link";

type PostPreviewProps = {
    title: string;
    coverImage: {
        node: {
            sourceUrl: string;
        };
    };
    date: string;
    excerpt: string;
    author: {
        name: string;
        firstName: string;
        lastName: string;
        avatar: {
            url: string;
        };
    };
    slug: string;
};

export default function PostPreview({
                                        title,
                                        coverImage,
                                        date,
                                        excerpt,
                                        author,
                                        slug,
                                    }: PostPreviewProps) {
    return (
        <div>
            <div className="mb-5">
                {coverImage && (
                    <CoverImage title={title} coverImage={coverImage.node.sourceUrl} slug={slug} />
                )}
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link
                    href={`/posts/${slug}`}
                    className="hover:underline"
                    dangerouslySetInnerHTML={{ __html: title }}
                ></Link>
            </h3>
            <div className="text-lg mb-4">
                <Articledate dateString={date} />
            </div>
            <div
                className="text-lg leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: excerpt }}
            />
            <Avatar author={{ node: author }} />
        </div>
    );
}
