import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Header from "@/components/menu/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner"
import ChatBotWidget from "@/components/chat-bot";


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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className="relative min-h-[100vh] w-full bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <>
            <Header />
            {children}
            <Footer />
            <Toaster />
            <ChatBotWidget />
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
