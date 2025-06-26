import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export default function AddTeamDialogBox() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusIcon className="w-4 h-4" />
                    Add Team Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}