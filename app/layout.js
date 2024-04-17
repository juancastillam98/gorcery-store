"use client"
import { Oswald } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import {Header} from "@/components/custom/Header";
import {Footer} from "@/components/custom/Footer";
import "./globals.css";
import {usePathname} from "next/navigation";
import ProductsProvider from "@/contextAPI/ProductsProvider";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const oswald = Oswald({ subsets: ["latin"] });

/*
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
*/

export default function RootLayout({ children }) {
    const pathname=usePathname();
    const showHeader = pathname=="/sign-in" || pathname=="/create-account" ?false:true;
  return (
    <html lang="en">
        <ProductsProvider>
            <PayPalScriptProvider options={{clientId:`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_CREDENTIUALS}`}}>
                <body className={oswald.className}>
                    {showHeader && <Header/>}
                    {children}
                    <Toaster/>
                    <Footer/>
                </body>
            </PayPalScriptProvider>
        </ProductsProvider>
    </html>
  );
}
