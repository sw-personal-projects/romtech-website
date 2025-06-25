import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import MainLayout from "@/components/layouts/main-layout";


export const metadata: Metadata = {
  title: "ROM-TECH",
  description: "Software company specializing in web, app development and technology solutions.",
  keywords: ["ROM-Tech", 'ROM', "technology", "software development", "tech solutions"],
};


export default function RootLayout(
  { children }:
    {
      children: React.ReactNode

    }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="relative min-h-[100vh] w-full bg-background">

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
