import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "ROM-TECH | ANNOUNCEMENTS",
    description: "Latest news and updates from ROM-TECH - Your trusted software development partner.",
};

export default function Announcement() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] max-h-[500px]">
                <Image
                    src="/announcemnt.webp"
                    fill
                    alt="Announcements banner"
                    className="w-full h-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-[Poppins] mb-4 text-white">
                        Announcements
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl text-white">
                        Stay updated with our latest news, product releases, and company updates.
                    </p>
                </div>
            </div>

            {/* Empty State Section */}
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
                        « No Announcements Yet »
                    </h2>
                </div>
            </div>
        </div>
    );
}