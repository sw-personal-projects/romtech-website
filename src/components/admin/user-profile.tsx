"use client"

import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function UserProfile() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="border bg-black border-primary/80 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Image
                                    src="/Logo.png"
                                    alt="logo"
                                    width={80}
                                    height={80}
                                />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Sonam Wangchuk</span>
                                <span className="truncate text-xs">Admin</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
