"use client"

import { deleteTeamMember } from "@/actions/about/team-members-actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter, DialogHeader,
    DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Loader2, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TeamMember = {
    id: number
    name: string
    position: string
    image: string
}

export default function DeleteTeamDialogBox({ teamMember }: { teamMember: TeamMember }) {
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteTeamMember(Number(teamMember.id))
            setOpen(false)
            setIsDeleting(false)
            toast.success("Team member deleted successfully!")
        } catch (error) {
            setIsDeleting(false)
            console.error(error)
            toast.error("Failed to delete team member")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-10 flex justify-center items-center">
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Team Member</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete <span className="font-bold text-red-500 capitalize">{teamMember.name}</span>?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
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