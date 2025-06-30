import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "ROM-TECH | 404",
};

export default function NotFound() {
    return (
        <div className="bg-background h-screen w-full">
            <div className="flex flex-col items-center justify-center h-full">
                <div>
                    <h1 className="text-2xl font-bold uppercase">Page not found!</h1>
                </div>
                <div>
                    <Image
                        src='/404-error.svg'
                        alt="404"
                        width={500}
                        height={500}
                    />
                </div>
                <Link href="/">
                    <Button className="uppercase">
                        Go back to home
                    </Button>
                </Link>
            </div>
        </div>
    );
}