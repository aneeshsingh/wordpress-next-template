import React from "react";
import styles from "@/app/components/post-body.module.css";

type PostBodyProps = {
    content: string;
};

export default function PostBody({ content }: PostBodyProps) {
    return (
        <div className="max-w-2xl mx-auto">
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}
