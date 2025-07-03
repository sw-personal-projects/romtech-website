import { AppSidebar } from "@/components/admin/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AdminHeader from "@/components/admin/header"
import NextTopLoader from "nextjs-toploader"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <NextTopLoader color="#32CD32" height={3} crawlSpeed={100} showSpinner={false} />
            <AppSidebar />
            <SidebarInset>
                {/* Horizontal Navbar Dashboard */}
                <AdminHeader />

                {/* children */}
                <div className="px-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}