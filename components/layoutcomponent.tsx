// /app/layout.tsx
import { Metadata } from 'next';
import Alert from "@/app/components/alert";
import Footer from "@/app/components/footer";
import React from "react";

type LayoutPropsNew = {
    preview: boolean;
    children: React.ReactNode;
};

export const metadata: Metadata = {
    title: {
        template: '%s | Alkye Dashboard',
        default: 'Alkye Dashboard',
    },
    description: 'The official Alkye.',
    metadataBase: new URL('https://alkye.com/'),
    icons: {
        icon: [
            { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
            { rel: 'shortcut icon', url: '/favicon/favicon.ico' },
        ],
    },
    openGraph: {
        title: 'Alkye',
        description: 'The official NAlkye.',
        url: 'https://alkye.com/',
        siteName: 'Acme Dashboard',
        images: [
            {
                url: 'https://alkye.com/static/Alkye-logo-aed5adfbbcf5fb67df1192036da00803.svg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
            }
        ],
        locale: 'en_US',
        type: 'website',
    },
    alternates: {
        canonical: 'https://alkye.com/',
        types: {
            'application/rss+xml': '/feed.xml'
        }
    },
};

function LayoutComponent({ preview, children }: LayoutPropsNew) {
    return (
        <div className="min-h-screen">
            <Alert preview={preview} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default LayoutComponent;
