import React from "react";
import Alert from "@/app/components/alert";
import Footer from "@/app/components/footer";
import Meta from "@/app/components/meta";

type LayoutPropsNew = {
    preview: boolean;
    children: React.ReactNode;
};

function LayoutComponent({ preview, children }: LayoutPropsNew) {
    return (
        <>
            <Meta />
            <div className="min-h-screen">
                <Alert preview={preview} />
                <main>{children}</main>
            </div>
            <Footer />
        </>
    );
}

export default LayoutComponent;
