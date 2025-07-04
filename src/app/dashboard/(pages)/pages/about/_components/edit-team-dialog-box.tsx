"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, Loader2, PencilIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import * as z from "zod"
import Image from "next/image"
import { updateTeamMember } from "@/actions/about/team-members-actions"

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    position: z.string().min(1, {
        message: "Position is required.",
    }),
    image: z
        .any()
        .refine((files) => files?.length === 1, "Image is required.")
        .refine(
            (files) => files?.[0]?.type?.startsWith("image/"),
            "File must be an image"
        )
        .optional(),
})

type FormData = z.infer<typeof FormSchema>

type TeamMember = {
    id: number
    name: string
    position: string
    image: string
}

export default function EditTeamDialogBox({ teamMember }: { teamMember: TeamMember }) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: teamMember.name || "",
            position: teamMember.position || "",
            image: undefined,
        },
    })

    const watchImage = form.watch("image")

    useEffect(() => {
        if (watchImage?.[0]) {
            const url = URL.createObjectURL(watchImage[0])
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [watchImage])

    const onSubmit = async (data: FormData) => {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("position", data.position)
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0])
        }

        try {
            await updateTeamMember(Number(teamMember.id), formData)
            toast.success("Team member updated successfully!")
            form.reset()
            setPreviewUrl(null)
            setOpen(false) // ✅ close dialog on success
        } catch (error: any) {
            console.error("Upload error:", error)
            toast.error(error.message || "Failed to update team member.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-10 flex justify-center items-center">
                    <PencilIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="p-10 border border-primary/30">
                <DialogHeader>
                    <DialogTitle>Edit Team Member</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter team member name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Position */}
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter team member position" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image Upload */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormLabel>New Image (Optional)</FormLabel>
                                    <FormControl>
                                        <div>
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    onChange(e.target.files)
                                                }}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="image"
                                                className={cn(
                                                    "flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium",
                                                    "hover:bg-gray-300 hover:text-black cursor-pointer rounded-md border-2 border-dashed border-primary/30 h-20"
                                                )}
                                            >
                                                <Upload className="w-4 h-4" />
                                                Upload Photo
                                            </label>
                                            {watchImage?.[0] && (
                                                <p className="text-sm text-center mt-1 text-muted-foreground">
                                                    {watchImage[0].name}
                                                </p>
                                            )}
                                            {previewUrl && (
                                                <div className="flex justify-center pt-3">
                                                    <Image
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-30 object-contain border-2 border-gray-200"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    Update Team Member
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
