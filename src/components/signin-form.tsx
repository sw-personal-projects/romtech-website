"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export default function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again." + err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="max-w-[500px] w-full shadow-none border-none bg-transparent">
            <CardHeader>
                <CardTitle className="text-3xl">Sign In</CardTitle>
                <CardDescription>
                    Sign in to your account to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-5">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {error === "CredentialsSignin" ? "Invalid credentials! Try again." : error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="your@email.com"
                                            {...field}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="••••••••••••"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-5" disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 mr-2" /> : "Sign In"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}