"use client"

import * as React from "react"
import {
    FolderKanban,
    Frame,
    Home,
    Info,
    Mail,
    Megaphone,
    PieChart,
    Settings,
    Users,
} from "lucide-react"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { UserProfile } from "./user-profile"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"

// nav items data.
const data = {
    contentManagement: [
        {
            name: "Home",
            url: "/dashboard/pages/home",
            icon: Home
        },
        {
            name: "About",
            url: "/dashboard/pages/about",
            icon: Info
        },
        {
            name: "Contact",
            url: "/dashboard/pages/contact",
            icon: Mail
        },
        {
            name: "Services",
            url: "/dashboard/pages/services",
            icon: Settings
        },
        {
            name: "Projects",
            url: "/dashboard/pages/projects",
            icon: FolderKanban
        },
        {
            name: "Announcement",
            url: "/dashboard/pages/announcement",
            icon: Megaphone
        }
    ],
    overview: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: Frame
        },
        {
            name: "Analytics",
            url: "/analytics",
            icon: PieChart,
        },
        {
            name: "User Management",
            url: "/users",
            icon: Users
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const session = useSession();
    const pathname = usePathname();
    const user = {
        name: session.data?.user?.name || "",
        email: session.data?.user?.email || "",
    }

    // Function to check if a navigation item is active
    const isActive = (url: string) => {
        // For dashboard root, check exact match
        if (url === "/dashboard") {
            return pathname === "/dashboard/overview";
        }
        // For other pages, check if pathname starts with the url
        return pathname.startsWith(url);
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <UserProfile />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.overview.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "hover:bg-primary hover:text-primary-foreground",
                                            isActive(item.url) && "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* Content Management Nav items */}
                <SidebarGroup>
                    <SidebarGroupLabel>Pages (Content Management)</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.contentManagement.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "hover:bg-primary hover:text-primary-foreground",
                                            isActive(item.url) && "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}