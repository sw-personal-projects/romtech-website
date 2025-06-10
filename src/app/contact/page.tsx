import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";
import ScaleUpBlur from "@/components/animations/scale-up-blur";

export const metadata: Metadata = {
    title: "ROM-TECH | CONTACT",
    description: "Software company specializing in web, app development and technology solutions.",
};


export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <div className="h-[40vh] relative">
                <video
                    className="w-full h-full object-cover"
                    src='/coding.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute top-0 h-full w-full bg-black/70">
                    <div className="container mx-auto flex flex-col justify-center items-center h-full">
                        <h1 className="text-6xl font-[Popins] text-white">Contact Us</h1>
                        <p className="text-white">We’re here to help you with your IT needs. Reach out to our team today.</p>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-0 mt-8 md:mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Contact Form */}
                    <Card className="rounded-xl p-8 border-primary/20">
                        <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                        <ContactForm />
                    </Card>

                    {/* Contact Information */}
                    <ScaleUpBlur delay={0.3}>
                        <Card className="rounded-xl shadow-lg p-8 border-primary/20">
                            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 p-3 rounded-lg border">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">Address</h3>
                                        <p className="mt-1 text-primary/70">Chubachu, Thimphu</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 p-3 rounded-lg border">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">Phone</h3>
                                        <p className="mt-1 text-primary/70">+975 17773054</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 p-3 rounded-lg border">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">Email</h3>
                                        <p className="mt-1 text-primary/70">romtech@romtech.bt</p>
                                    </div>
                                </div>

                                {/* Map Embed */}
                                <div className="mt-8">
                                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d113270.30413118981!2d89.55605784904571!3d27.47869084364627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39e19516764c2f0d%3A0x2002fc809ec281c5!2sFJHQ%2BF9P%2C%20Chubachu%2C%20Thimphu!3m2!1d27.4787288!2d89.6384571!5e0!3m2!1sen!2sbt!4v1749547078005!5m2!1sen!2sbt"
                                            width="100%"
                                            height="300"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            className="rounded-lg"
                                        >
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </ScaleUpBlur>
                </div>
            </div>
        </div>
    );
}