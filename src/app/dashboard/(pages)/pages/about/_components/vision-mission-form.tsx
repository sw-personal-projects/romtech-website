"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createVisionMission, updateVisionMission } from "@/actions/about/vision-mission-actions"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    vision: z
        .string()
        .min(10, {
            message: "Vision must be at least 10 characters.",
        })
        .max(500, {
            message: "Vision must not be longer than 500 characters.",
        }),
    mission: z
        .string()
        .min(10, {
            message: "Mission must be at least 10 characters.",
        })
        .max(500, {
            message: "Mission must not be longer than 500 characters.",
        }),
})

export function VisionMissionForm({
    visionMissions,
}: {
    visionMissions: { id: number; vision: string; mission: string }[]
}) {
    const router = useRouter();
    const existingVisionMission = visionMissions.length > 0 ? visionMissions[0] : null;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            vision: existingVisionMission?.vision || "",
            mission: existingVisionMission?.mission || ""
        },
        mode: "onChange"
    })

    // Update form values when existing data is available
    useEffect(() => {
        if (existingVisionMission) {
            form.reset({
                vision: existingVisionMission.vision,
                mission: existingVisionMission.mission
            });
        }
    }, [existingVisionMission, form]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        let response;

        if (existingVisionMission) {
            // Update existing vision mission
            response = await updateVisionMission(existingVisionMission.id, data);
        } else {
            // Create new vision mission
            response = await createVisionMission(data);
        }

        if (response.status === 200 || response.status === 201) {
            toast.success(response.message);
            router.refresh();
        } else {
            toast.error(response.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="vision"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vision</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your company vision"
                                    className="resize-none text-primary/80"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mission"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mission</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your company mission"
                                    className="resize-none text-primary/80"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type="submit" className="px-10">
                        {existingVisionMission ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
