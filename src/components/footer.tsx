import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-16 px-6 sm:px-12 border-t border-primary/15 md:mt-[200px] mt-[70px]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center relative">
                        <Image
                            src="/Logo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="object-contain object-right absolute -top-2 left-0"
                        />
                        <span className="text-5xl md:text-6xl font-bold font-[Poppins] text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-950 pl-14">
                            OM Tech
                        </span>
                    </div>
                    <p className="text-primary/80 leading-relaxed max-w-lg md:pl-4">
                        ROM Tech is a leading tech solutions provider in Bhutan, specializing in innovative IT services, software development, and digital transformation. Our mission is to empower businesses with cutting-edge technology to drive growth and efficiency.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-3 text-primary/80">
                        {["Our Services", "Our Projects", "About Us", "Announcement", "Contact Us"].map((item) => (
                            <li key={item}>
                                <a href="#" className="hover:text-primary text-sm transition-all duration-200">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wider">Contact Us</h3>
                    <ul className="space-y-3 text-primary/80">
                        <li className="flex items-start gap-3">
                            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                            <span>Chubachu, Thimphu, Bhutan</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={16} className="flex-shrink-0" />
                            <a href="tel:+97517773054" className="hover:text-primary text-sm transition-all duration-200">+975-17773054</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={16} className="flex-shrink-0" />
                            <a href="mailto:romtech@romtech.bt" className="hover:text-primary text-sm transition-all duration-200">romtech@romtech.bt</a>
                        </li>
                        <li className="flex items-center gap-3 text-sm">
                            <Clock size={16} className="flex-shrink-0" />
                            <span>Mon - Fri: 10:00 AM - 5:00 PM (BST)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-16 border-t border-primary/25 pt-6 text-center text-primary/50 text-xs">
                Copyright © 2025 ROM Tech | All rights reserved
            </div>
        </footer>
    );
}