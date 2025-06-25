import { AppSidebar } from "@/components/admin/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AdminHeader from "@/components/admin/header"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
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