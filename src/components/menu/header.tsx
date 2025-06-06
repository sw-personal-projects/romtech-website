"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import gsap from "gsap"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ThemeModeToggle } from "../theme-switch"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const mobileMenuBgRef = useRef<HTMLDivElement>(null)
    const mobileMenuPanelRef = useRef<HTMLDivElement>(null)

    // Toggle submenu
    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu)
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Disable scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // GSAP animations for mobile menu
    useEffect(() => {
        if (isOpen) {
            // Show menu animation
            gsap.timeline()
                .set(mobileMenuRef.current, { display: "block" })
                .fromTo(mobileMenuBgRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: "power2.out" }
                )
                .fromTo(mobileMenuPanelRef.current,
                    { x: "-100%" },
                    { x: "0%", duration: 0.3, ease: "power2.out" },
                    "<"
                )
        } else {
            // Hide menu animation
            if (mobileMenuRef.current) {
                gsap.timeline()
                    .to(mobileMenuPanelRef.current,
                        { x: "-100%", duration: 0.2, ease: "power2.in" }
                    )
                    .to(mobileMenuBgRef.current,
                        { opacity: 0, duration: 0.2, ease: "power2.in" },
                        "<"
                    )
                    .set(mobileMenuRef.current, { display: "none" })
            }
            // Close all submenus when main menu closes
            setOpenSubmenu(null)
        }
    }, [isOpen])

    // GSAP animations for submenu
    useEffect(() => {
        const submenu = document.getElementById('mobile-submenu')
        if (submenu) {
            if (openSubmenu === 'services') {
                gsap.fromTo(submenu,
                    { height: 0, opacity: 0 },
                    { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
                )
            } else if (openSubmenu === null) {
                gsap.to(submenu,
                    { height: 0, opacity: 0, duration: 0.2, ease: "power2.in" }
                )
            }
        }
    }, [openSubmenu])

    // Close menu when clicking outside or on a link
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && !(event.target as Element).closest(".mobile-menu")) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen])

    // Close menu when pressing Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false)
            }
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen])

    return (
        <div className={cn(
            "h-20 w-full border-b border-accent/50 bg-background/30 sticky top-0 z-50 backdrop-blur transition-all",
            isScrolled ? "shadow-sm" : ""
        )}>
            <div className="container mx-auto h-full flex justify-between items-center px-4">
                {/* Logo Section */}
                <div>
                    <Image
                        src='/logo.png'
                        width={50}
                        height={50}
                        alt="logo"
                    />
                </div>

                {/* Desktop Menu - hidden on mobile */}
                <NavigationMenu className="hidden md:flex shadow-2xl backdrop-blur-[9.5px] rounded-[28px] border border-white/10 px-6 py-2">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/about">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/contact">Contact</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/our-projects">Our Projects</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4">
                                    <NavigationMenuLink asChild>
                                        <Link href="/services/app-development">
                                            <div className="font-medium">App Development</div>
                                            <div className="text-muted-foreground text-sm">
                                                Custom mobile applications for iOS and Android, built with modern frameworks.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/services/web-development">
                                            <div className="font-medium">Web Development</div>
                                            <div className="text-muted-foreground text-sm">
                                                Responsive websites, web applications, and e-commerce solutions tailored to your needs.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/services/graphic-design">
                                            <div className="font-medium">Graphic Design</div>
                                            <div className="text-muted-foreground text-sm">
                                                Brand identity, UI/UX design, marketing materials, and visual content creation.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/services/hardware-integration">
                                            <div className="font-medium">Hardware & System Integration</div>
                                            <div className="text-muted-foreground text-sm">
                                                Custom hardware solutions and seamless integration with existing systems.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/services/consulting">
                                            <div className="font-medium">IT Consulting</div>
                                            <div className="text-muted-foreground text-sm">
                                                Strategic technology advice and digital transformation consulting services.
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/announcement">Announcement</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Menu Button - hidden on desktop */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeModeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Theme Toggle - hidden on mobile */}
                <div className="hidden md:block">
                    <ThemeModeToggle />
                </div>

                {/* Mobile Menu - appears when hamburger is clicked */}
                <div
                    ref={mobileMenuRef}
                    className="mobile-menu fixed inset-0 top-20 h-screen z-50 md:hidden"
                    style={{ display: 'none' }}
                >
                    {/* Background overlay */}
                    <div
                        ref={mobileMenuBgRef}
                        className="absolute inset-0 bg-black/50 backdrop-blur-lg"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu panel */}
                    <div
                        ref={mobileMenuPanelRef}
                        className="absolute left-0 top-0 h-full w-[80%] bg-background shadow-xl overflow-y-auto"
                    >
                        <div className="h-full px-4 py-6">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/"
                                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/docs"
                                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="pt-2">
                                    <button
                                        onClick={() => toggleSubmenu('services')}
                                        className="flex items-center justify-between w-full py-2 text-lg font-medium hover:text-primary transition-colors"
                                    >
                                        <span>Services</span>
                                        {openSubmenu === 'services' ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </button>
                                    <div
                                        id="mobile-submenu"
                                        className="overflow-hidden"
                                        style={{ height: 0, opacity: 0 }}
                                    >
                                        <ul className="pl-4 space-y-3 mt-2 border-l border-muted">
                                            <li>
                                                <Link
                                                    href="/services/app-development"
                                                    className="block py-1.5 text-base hover:text-primary transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    App Development
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/web-development"
                                                    className="block py-1.5 text-base hover:text-primary transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Web Development
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/graphic-design"
                                                    className="block py-1.5 text-base hover:text-primary transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Graphic Design
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/hardware-integration"
                                                    className="block py-1.5 text-base hover:text-primary transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Hardware & System Integration
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/services/consulting"
                                                    className="block py-1.5 text-base hover:text-primary transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    IT Consulting
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        href="/docs"
                                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/docs"
                                        className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Announcement
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}