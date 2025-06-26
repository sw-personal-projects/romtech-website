import SignInForm from "@/components/signin-form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Sign In",
};

export default function SignIn() {
    return (
        <div className="h-screen">
            <div className="h-full grid grid-cols-1 md:grid-cols-2">
                <div className="flex items-center justify-center px-4">
                    <SignInForm />
                </div>
                <div className="hidden bg-accent/50 md:flex flex-col items-center justify-center">
                    <Image src="/Logo.png"
                        alt="Logo"
                        width={500} height={500}
                        className="object-contain" />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold font-serif">ROM TECH</h1>
                    </div>
                </div>
            </div>
        </div>
    );

}