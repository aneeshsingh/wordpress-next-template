import React from "react";
import Avatar from "@/app/components/avatar";
import Articledate from "@/app/components/articledate";
import CoverImage from "@/app/components/cover-image";
import PostTitle from "@/app/components/post-title";
import Categories from "@/app/components/categories";

type PostHeaderProps = {
    title: string;
    coverImage?: {
        node?: {
            sourceUrl?: string;
        };
    };
    date: string;
    author: {
        name: string;
        firstName: string;
        lastName: string;
        avatar?: {
            url?: string;
        };
    };
    categories: {
        edges: {
            node: {
                name: string;
            };
        }[];
    };
};

const DEFAULT_AVATAR_URL = 'http://2.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=64&d=mm&r=g';
const DEFAULT_COVER_IMAGE_URL = 'http://34.70.84.48:8000/wp-content/uploads/2024/07/free-photo-of-aerial-view-of-water-splashing-on-a-rocky-shore-1024x694.jpeg';

export default function PostHeader({
                                       title,
                                       coverImage,
                                       date,
                                       author,
                                       categories,
                                   }: PostHeaderProps) {
    const coverImageUrl = coverImage?.node?.sourceUrl || DEFAULT_COVER_IMAGE_URL;
    const avatarUrl = author.avatar?.url || DEFAULT_AVATAR_URL;

    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className="hidden md:block md:mb-12">
                <Avatar author={{ node: { ...author, avatar: { url: avatarUrl } } }} />
            </div>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} coverImage={{ node: { sourceUrl: coverImageUrl } }} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar author={{ node: { ...author, avatar: { url: avatarUrl } } }} />
                </div>
                <div className="mb-6 text-lg">
                    Posted <Articledate dateString={date} />
                    <Categories categories={categories} />
                </div>
            </div>
        </>
    );
}
