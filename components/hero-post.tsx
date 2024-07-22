import Avatar from "@/app/components/avatar";
import ArticleDate from "@/app/components/articledate";
import CoverImage from "@/app/components/cover-image";
import Link from "next/link";
import React from "react";
interface HeroPostProps {
    title: string;
    coverImage?: {
        node?: {
            sourceUrl?: string;
        };
    };
    dateString: string; // Ensure this matches the format you’re using
    excerpt: string;
    author: {
        name: string;
        firstName: string;
        lastName: string;
        avatar?: {
            url?: string;
        };
    };
    slug: string;
}

const DEFAULT_AVATAR_URL = 'http://2.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=64&d=mm&r=g';
const DEFAULT_COVER_IMAGE_URL = 'https://dev.alkye.com/wp-content/uploads/2023/08/chris-lynch-Qruwi3Ur3Ak-unsplash-1.webp';

export default function HeroPost({
                                     title,
                                     coverImage,
                                     dateString,
                                     excerpt,
                                     author,
                                     slug,
                                 }: HeroPostProps) {
    const coverImageUrl = coverImage?.node?.sourceUrl || DEFAULT_COVER_IMAGE_URL;
    const avatarUrl = author.avatar?.url || DEFAULT_AVATAR_URL;

    return (
        <section>
            <div className="mb-8 md:mb-16">
                {coverImage && (
                    <CoverImage title={title} coverImage={coverImageUrl} />
                )}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                        <Link
                            href={`/posts/${slug}`}
                            className="hover:underline"
                            dangerouslySetInnerHTML={{ __html: title }}
                        ></Link>
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        <ArticleDate dateString={dateString} />
                    </div>
                </div>
                <div>
                    <div
                        className="text-lg leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                    <Avatar author={{ node: { ...author, avatar: { url: avatarUrl } } }} />
                </div>
            </div>
        </section>
    );
}
