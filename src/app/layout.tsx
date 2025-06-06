import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Header from "@/components/menu/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "ROM-TECH",
  description: "Software company specializing in web, app development and technology solutions.",
  keywords: ["ROM", "technology", "software development", "tech solutions"],
};


export default function RootLayout(
  { children }:
    {
      children: React.ReactNode

    }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body suppressHydrationWarning className="relative min-h-[100vh] w-full bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Header />
            {children}
            <Footer />
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
