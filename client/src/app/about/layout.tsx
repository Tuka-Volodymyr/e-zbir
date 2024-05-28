import type {Metadata} from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import AuthHeader from "@/components/AuthHeader";
import AuthAside from "@/components/AuthAside";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Про нас",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ua">
        <body className=''>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}