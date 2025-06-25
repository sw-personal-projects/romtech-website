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

// nav items data.
const data = {
    user: {
        name: "Sonam Wangchuk",
        email: "s.wangchuk@romtech.bt",
        avatar: "/avatars/shadcn.jpg",
    },
    contentManagement: [
        {
            name: "Home",
            url: "/pages/home",
            icon: Home
        },
        {
            name: "About",
            url: "/pages/about",
            icon: Info
        },
        {
            name: "Contact",
            url: "/pages/contact",
            icon: Mail
        },
        {
            name: "Services",
            url: "/pages/services",
            icon: Settings
        },
        {
            name: "Projects",
            url: "/pages/projects",
            icon: FolderKanban
        },
        {
            name: "Announcements",
            url: "/pages/announcements",
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
                                    <SidebarMenuButton asChild>
                                        <Link href="#">
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
                                    <SidebarMenuButton asChild>
                                        <Link href="#">
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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}