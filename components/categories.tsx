import React from "react";

// Define the type for the category node
type CategoryNode = {
    name: string;
};

// Define the type for each edge
type CategoryEdge = {
    node: CategoryNode;
};

// Define the type for the categories prop
type CategoriesProps = {
    categories: {
        edges: CategoryEdge[];
    };
};

export default function Categories({ categories }: CategoriesProps) {
    return (
        <span className="ml-1">
            under
            {categories.edges.length > 0 ? (
                categories.edges.map((category, index) => (
                    <span key={index} className="ml-1">
                        {category.node.name}
                    </span>
                ))
            ) : (
                <span className="ml-1">No categories</span>
            )}
        </span>
    );
}
