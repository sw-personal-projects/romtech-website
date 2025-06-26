'use client'

import { Toaster } from "sonner"
import ChatBotWidget from "./chat-bot"
import Footer from "./footer"
import Header from "./menu/header"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const urlPathName = usePathname();
    const isAuthPage = urlPathName.startsWith('/auth');
    const isDashboardPage = urlPathName.startsWith('/dashboard');
    const session = useSession();
    return (
        <div>
            {!isAuthPage && !isDashboardPage && session.status === "unauthenticated" && (
                <Header />
            )}
            {children}
            <Toaster />
            {!isAuthPage && !isDashboardPage && session.status === "unauthenticated" && (
                <React.Fragment>
                    <Footer />
                    <ChatBotWidget />
                </React.Fragment>
            )}
        </div>
    )
}