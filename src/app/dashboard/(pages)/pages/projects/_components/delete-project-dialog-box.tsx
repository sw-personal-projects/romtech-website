"use client"

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProjectListProps } from "./project-list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { deleteProject } from "@/actions/project/project-actions";

export default function DeleteProjectDialogBox({ project }: { project: ProjectListProps }) {
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [projectName, setProjectName] = useState("")

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteProject(project.id)
            toast.success("Project deleted successfully")
            setOpen(false)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete project")
        } finally {
            setIsDeleting(false)
            setOpen(false)
        }
    }
    const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Project</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <span className="font-bold text-red-500 capitalize">{project.title}</span>?
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full items-center gap-3 mt-4">
                    <Label className="text-sm text-muted-foreground" htmlFor="project-name">To confirm, type the project name<span className="font-bold text-primary">{project.title}</span>below:</Label>
                    <Input type="text" id="project-name" placeholder={`Type the "${project.title}"`} value={projectName} onChange={handleProjectNameChange} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting || projectName !== project.title}>
                        {isDeleting ?
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                <span>Deleting...</span>
                            </>
                            :
                            "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}