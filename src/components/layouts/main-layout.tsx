"use client";
import { SessionProvider } from "next-auth/react";
import ClientLayout from "../client-layout";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ClientLayout>
                {children}
            </ClientLayout>
        </SessionProvider>
    );
}