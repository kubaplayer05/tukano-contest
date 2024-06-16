import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../styles/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Tukano Graph",
    description: "Create and Share with your graphs, using Tukano Graph application",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}
