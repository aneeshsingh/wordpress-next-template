import Image from "next/image";
import React from "react";

// Define the type for the author prop
type AuthorNode = {
    firstName?: string;
    lastName?: string;
    name?: string;
    avatar?: {
        url?: string;
    };
};

type Author = {
    node: AuthorNode;
};

// Define the props type for the Avatar component
type AvatarProps = {
    author: Author;
};
const DEFAULT_AVATAR_URL = 'http://2.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=64&d=mm&r=g';

export default function Avatar({ author }: AvatarProps) {
    const isAuthorHaveFullName =
        author?.node?.firstName && author?.node?.lastName;
    const name = isAuthorHaveFullName
        ? `${author.node.firstName} ${author.node.lastName}`
        : author.node.name || "Unnamed Author";  // Provide a default value here
    const avatarUrl = author.node.avatar?.url || DEFAULT_AVATAR_URL;

    return (
        <div className="flex items-center">
            <div className="w-12 h-12 relative mr-4">
                <Image
                    src={avatarUrl}
                    fill
                    className="rounded-full"
                    alt={name}
                />
            </div>
            <div className="text-xl font-bold">{name}</div>
        </div>
    );
}
