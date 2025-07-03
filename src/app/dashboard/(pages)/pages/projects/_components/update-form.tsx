"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import { PlusIcon, Upload, Loader2, TrashIcon } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import * as z from "zod"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { updateProject } from "@/actions/project/project-actions"
import { Card } from "@/components/ui/card"

const FormSchema = z.object({
    id: z.number(),
    title: z.string().min(1, { message: "Title is required." }),
    category: z.string().min(1, { message: "Category is required." }),
    desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
    detailDescription: z.array(z.string().min(1, "Project detail cannot be empty")),
    imageUrl: z.any().optional(),
    existingImageUrl: z.string(),
})

type FormData = z.infer<typeof FormSchema>

interface UpdateFormProps {
    project: {
        id: number
        title: string
        category: string
        desc: string
        detailDescription: string[] // This comes as ['["item1","item2"]']
        imageUrl: string
    }
}

export function UpdateForm({ project }: UpdateFormProps) {
    const [previewUrl, setPreviewUrl] = useState<string>(project.imageUrl)
    const [isImageChanged, setIsImageChanged] = useState(false)

    // Parse the detailDescription if it's a stringified array
    const parseDetails = (details: string[]) => {
        try {
            // Handle case where it's already an array of strings
            if (details.length > 0 && !details[0].startsWith('[')) {
                return details
            }
            // Handle stringified array case
            return details.length > 0 ? JSON.parse(details[0]) : [""]
        } catch (error) {
            console.error("Error parsing detailDescription:", error)
            return [""]
        }
    }

    const initialDetails = parseDetails(project.detailDescription)

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            id: project.id,
            title: project.title,
            category: project.category,
            desc: project.desc,
            detailDescription: initialDetails,
            existingImageUrl: project.imageUrl,
            imageUrl: undefined,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "detailDescription",
    })

    const watchImage = form.watch("imageUrl")

    useEffect(() => {
        if (watchImage?.[0]) {
            const url = URL.createObjectURL(watchImage[0])
            setPreviewUrl(url)
            setIsImageChanged(true)
            return () => URL.revokeObjectURL(url)
        }
    }, [watchImage])

    const onSubmit = async (data: FormData) => {
        const formData = new FormData()
        formData.append("id", data.id.toString())
        formData.append("title", data.title)
        formData.append("category", data.category)
        formData.append("desc", data.desc)

        // Stringify the detailDescription array
        formData.append("detailDescription", JSON.stringify(data.detailDescription))

        if (isImageChanged && data.imageUrl?.[0]) {
            formData.append("imageUrl", data.imageUrl[0])
        } else {
            formData.append("existingImageUrl", data.existingImageUrl)
        }

        try {
            await updateProject(formData)
            toast.success("Project updated successfully!")
        } catch (error: any) {
            console.error("Update error:", error)
            toast.error(error.message || "Failed to update project.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="space-y-6 h-[80vh] overflow-y-scroll pt-2">
                        <div className="space-y-6 h-[70vh] overflow-y-scroll p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Project title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Project category" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Brief project description"
                                                {...field}
                                                rows={4}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* PROJECT DETAILS */}
                            <div className="space-y-4">
                                <FormLabel>Project Details</FormLabel>
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2 items-start relative">
                                        <FormField
                                            control={form.control}
                                            name={`detailDescription.${index}`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={`Project Detail Paragraph ${index + 1}`}
                                                            {...field}
                                                            rows={2}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                className="mt-2 absolute top-0 right-0"
                                            >
                                                <TrashIcon className="w-4 h-4 text-destructive" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => append("")}
                                    className="gap-2"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Add Another Paragraph
                                </Button>
                            </div>

                            {/* PROJECT IMAGE */}
                            <div className="space-y-4">
                                <FormLabel>Project Image</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field: { onChange } }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    <input
                                                        id="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => onChange(e.target.files)}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="image-upload"
                                                        className={cn(
                                                            "flex flex-col items-center justify-center gap-2 p-6",
                                                            "border-2 border-dashed rounded-lg cursor-pointer",
                                                            "hover:border-primary transition-colors",
                                                            previewUrl ? "border-primary" : "border-muted"
                                                        )}
                                                    >
                                                        <Upload className="w-6 h-6" />
                                                        <p>{previewUrl ? "Change image" : "Upload new image"}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Recommended: 1200×630px (JPEG or PNG)
                                                        </p>
                                                    </label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>


                        {/* UPDATE BUTTON */}
                        <div className="w-full px-6">
                            <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Project"
                                )}
                            </Button>
                        </div>
                    </Card>
                    <div>
                        {previewUrl && (
                            <div className="relative w-full h-[80vh] rounded-md overflow-hidden border">
                                <Image
                                    src={previewUrl}
                                    alt="Project preview"
                                    width={700}
                                    height={700}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}