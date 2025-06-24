'use client'

import { Toaster } from "sonner"
import ChatBotWidget from "./chat-bot"
import Footer from "./footer"
import Header from "./menu/header"
import { usePathname } from "next/navigation"

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const urlPathName = usePathname();
    const userSession = urlPathName === '/auth/signin' || urlPathName === '/dashboard';
    return (
        <div>
            {!userSession && (
                <Header />
            )}
            {children}
            <Toaster />
            {!userSession && (
                <>
                    <Footer />
                    <ChatBotWidget />
                </>
            )}
        </div>
    )
}