
import { Metadata } from "next";
import Image from "next/image";
import StackingCards from "./_components/services-section";


export const metadata: Metadata = {
    title: "ROM-TECH | SERVICES",
    description: "Software company specializing in web, app development and technology solutions.",
};

export default function Services() {
    return (
        <div className="min-h-screen">
            <div className="w-full h-[40vh] relative">
                <Image src="/services.jpeg"
                    alt="about"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-6xl md:text-8xl font-bold text-white font-[Poppins]">Our Services</h1>
                    <p className="text-white text-center mt-4 text-lg font-[Poppins]">Innovative solutions for every business need</p>
                </div>
            </div>

            {/* Services Section */}
            <div>
                <StackingCards />
            </div>
        </div>
    );
}