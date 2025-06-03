import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { ThemeModeToggle } from "@/components/theme-switch";


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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
