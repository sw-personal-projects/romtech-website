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
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, Upload, Loader2, TrashIcon } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import * as z from "zod"
import Image from "next/image"
import { addProject } from "@/actions/project/project-actions"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    category: z.string().min(1, { message: "Category is required." }),
    desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
    detailDescription: z.array(z.string().min(1, "Project detail cannot be empty")),
    imageUrl: z
        .any()
        .refine((files) => files?.length === 1, "Image is required.")
        .refine(
            (files) => files?.[0]?.type?.startsWith("image/"),
            "File must be an image"
        ),
})

type FormData = z.infer<typeof FormSchema>

export default function AddProjectDialogBox() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            category: "",
            desc: "",
            detailDescription: [""],
            imageUrl: undefined,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "detailDescription",
    })

    useEffect(() => {
        if (fields.length === 0) {
            append("")
        }
    }, [fields, append])

    const watchImage = form.watch("imageUrl")

    useEffect(() => {
        if (watchImage?.[0]) {
            const url = URL.createObjectURL(watchImage[0])
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [watchImage])

    const onSubmit = async (data: FormData) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("category", data.category)
        formData.append("desc", data.desc)
        formData.append("detailDescription", JSON.stringify(data.detailDescription))
        formData.append("imageUrl", data.imageUrl[0])

        try {
            await addProject(formData)
            toast.success("Project added successfully!")
            form.reset()
            setPreviewUrl(null)
            setOpen(false)
        } catch (error: any) {
            console.error("Upload error:", error)
            toast.error(error.message || "Failed to add project.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-primary/90 hover:bg-primary/80">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="border border-primary/30">
                <DialogHeader className="px-4 py-2">
                    <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">

                        <div className="w-full space-y-6 max-h-[500px] overflow-y-scroll px-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter project title" {...field} />
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
                                            <Input placeholder="Enter project category" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="desc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brief Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter project brief description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Detail Descriptions Section */}
                            <div className="space-y-3">
                                <h3 className="font-medium text-sm">Project Details</h3>
                                {fields.map((field, index) => (
                                    <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`detailDescription.${index}`}
                                        render={({ field }) => (
                                            <div className="flex items-start gap-2">
                                                <div className="flex-1 space-y-1">
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder={`Project detail paragraph ${index + 1}`}
                                                            className="focus-visible:ring-primary mt-2"
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => remove(index)}
                                                        className="mt-7 text-destructive hover:text-destructive"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                ))}
                                <FormDescription className="text-xs text-muted-foreground">
                                    *Your can add new paragraph after filling the first one.
                                </FormDescription>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => append("")}
                                    className="w-full gap-2"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Add Another Paragraph
                                </Button>
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-3">
                                <h3 className="font-medium text-sm">Project Banner*</h3>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field: { onChange } }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="space-y-2">
                                                    <input
                                                        id="imageUrl"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            onChange(e.target.files)
                                                        }}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="imageUrl"
                                                        className={cn(
                                                            "flex flex-col items-center justify-center gap-2 w-full p-6",
                                                            "cursor-pointer rounded-lg border-2 border-dashed border-primary/30",
                                                            "hover:border-primary/50 hover:bg-primary/5 transition-colors",
                                                            previewUrl ? "border-primary/50" : ""
                                                        )}
                                                    >
                                                        <Upload className="w-6 h-6 text-primary" />
                                                        <div className="text-center">
                                                            <p className="font-medium">
                                                                {previewUrl ? "Change Image" : "Upload Project Banner"}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                Recommended: 1200×630px (JPEG or PNG)
                                                            </p>
                                                        </div>
                                                    </label>
                                                    {watchImage?.[0] && (
                                                        <p className="text-sm text-center text-muted-foreground truncate">
                                                            Selected: {watchImage[0].name}
                                                        </p>
                                                    )}
                                                    {previewUrl && (
                                                        <div className="flex justify-center pt-2">
                                                            <div className="relative w-full max-w-md h-48 rounded-md overflow-hidden border">
                                                                <Image
                                                                    src={previewUrl}
                                                                    alt="Preview"
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="px-4 pb-4">
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>Add Project</>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
