import React from "react";

type TagNode = {
    name: string;
};

type TagEdge = {
    node: TagNode;
};

type TagsProps = {
    tags: {
        edges: TagEdge[];
    };
};

export default function Tags({ tags }: TagsProps) {
    return (
        <div className="max-w-2xl mx-auto">
            <p className="mt-8 text-lg font-bold">
                Tagged
                {tags.edges.map((tag, index) => (
                    <span key={index} className="ml-4 font-normal">
            {tag.node.name}
          </span>
                ))}
            </p>
        </div>
    );
}
