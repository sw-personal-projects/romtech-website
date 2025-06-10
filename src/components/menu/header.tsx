"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeModeToggle } from "../theme-switch"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const menuItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Services", href: "/services" },
        { label: "Our Projects", href: "/our-projects" },
        { label: "Announcement", href: "/announcement" },
    ]

    // Scroll shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Lock scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
    }, [isOpen])



    const closeMenu = () => {
        setIsOpen(false)
    }

    // Close on outside click
    const menuRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu()
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    return (
        <header className={cn(
            "h-20 w-full sticky top-0 z-50 border-b border-white/20 bg-black backdrop-blur transition-all",
            isScrolled && "shadow-sm"
        )}>
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                {/* Logo */}
                <Link href="/">
                    <Image src="/Logo.png" width={50} height={50} alt="Logo" />
                </Link>

                {/* Desktop Nav */}
                <NavigationMenu className="hidden md:flex py-2 rounded-[28px] border border-white/10 backdrop-blur-[9.5px] shadow-2xl px-3">
                    <NavigationMenuList>
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.label} className="p-0">
                                <NavigationMenuLink asChild className="hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 rounded-[28px]">
                                    <Link className="uppercase font-medium text-xs text-white" href={item.href}>{item.label}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Nav Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeModeToggle />
                    <button className="text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Theme Toggle */}
                <div className="hidden md:block">
                    <ThemeModeToggle />
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        className="fixed inset-0 h-[calc(100vh-80px)] top-20 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
                            onClick={closeMenu}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            className="absolute left-0 top-0 h-full w-[80%] bg-black shadow-xl overflow-y-auto px-4 py-6"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                        >
                            <ul className="space-y-4">
                                {menuItems.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="block text-sm uppercase font-medium py-2 text-white/80"
                                            onClick={closeMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
