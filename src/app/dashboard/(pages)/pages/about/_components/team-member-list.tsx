import { getTeamMembers } from "@/actions/about/team-members-actions"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import EditTeamDialogBox from "./edit-team-dialog-box"
import DeleteTeamDialogBox from "./delete-team-dialog-box"

type TeamMember = {
    id: string
    name: string
    position: string
    image: string
}

export async function TeamMemberList() {
    const teamMembers: TeamMember[] = await getTeamMembers()
    return (
        <div className="grid grid-cols-4 gap-4">
            {teamMembers.length > 0 &&
                teamMembers.map((member) => (
                    <Card
                        key={member.id}
                        className="w-full h-[280px] bg-primary rounded-lg relative group overflow-hidden cursor-pointer p-0"
                    >
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-black/60 p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div>
                                <p className="text-white text-sm font-medium capitalize">{member.name}</p>
                                <p className="text-white text-xs capitalize">{member.position}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <DeleteTeamDialogBox teamMember={member} />
                                <EditTeamDialogBox teamMember={member} />
                            </div>
                        </div>
                    </Card>
                ))}

            {teamMembers.length === 0 && (
                <div className="col-span-4 text-center">
                    <p className="text-sm text-gray-500">No Team Members Found!</p>
                </div>
            )}
        </div>
    )
}
