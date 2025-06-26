import React from "react"
import { getAllVisionMissions } from "@/actions/about/vision-mission-actions";
import { VisionMissionForm } from "./_components/vision-mission-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import AddTeamDialogBox from "./_components/add-team-dialog-box";

export const metadata = {
    title: "Dashboard | About",
}

export default async function About() {
    const { data: visionMissions } = await getAllVisionMissions();
    const teamMembers: { name: string, role: string, imageUrl: string }[] = [
        {
            name: 'Sonam Wangchuk',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/sonam-wangchuk.jpeg',
        },
        {
            name: 'Yuadhistra Hang Subba',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/yuadhistra-hang-subba.jpeg',
        },
        {
            name: 'Tandin Gyeltshen',
            role: 'Executive Assistant',
            imageUrl: '/assets/team-member/tandin-gyeltshen.png',
        },
        {
            name: 'Dorji Phuntsho',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/dorji-phuntsho.jpeg',
        },
        {
            name: 'Shyam Basnet',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/shyam-basnet.png',
        },
        {
            name: 'Tenzin Yoezer',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tenzin-yoezer.jpeg',
        },
        {
            name: 'Tenzin Tshomo',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tenzin-tshomo.jpeg',
        },
        {
            name: 'Tandin Phuntsho',
            role: 'Software Engineer',
            imageUrl: '/assets/team-member/tandin-phuntsho.jpeg',
        }
    ]
    return (
        <div className="h-screen mt-4">
            {/* Secondary Header */}
            <Card className="shadow-md bg-gradient-to-r from-primary/5 to-primary/25 border border-border space-y-4">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">About Us</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm">
                        Easily manage and update your About Us page content here.
                    </CardDescription>
                </CardHeader>

                <CardContent>

                </CardContent>
            </Card>


            {/* Vision and Mission */}
            <div className="w-full mt-4">
                <Card className="p-5">
                    <VisionMissionForm visionMissions={visionMissions ?? []} />
                </Card>
            </div>

            {/* Team Members */}
            <div className="w-full mt-6">
                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <div>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>
                                Manage your team members here.
                            </CardDescription>
                        </div>
                        <div>
                            <AddTeamDialogBox />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                            {teamMembers.map((member) => (
                                <Dialog key={member.name}>
                                    {/* The clickable card acts as trigger */}
                                    <DialogTrigger asChild>
                                        <div className="w-full h-[280px] bg-primary rounded-lg relative group overflow-hidden cursor-pointer">
                                            <Image
                                                src={member.imageUrl}
                                                alt={member.name}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover object-top rounded-lg shadow-md border border-border transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b-lg opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                                <p className="text-white text-sm font-medium">{member.name}</p>
                                                <p className="text-white text-xs">{member.role}</p>
                                            </div>
                                        </div>
                                    </DialogTrigger>

                                    {/* Dialog Content */}
                                    <DialogContent className="max-w-sm">
                                        <DialogHeader>
                                            <DialogTitle>{member.name}</DialogTitle>
                                        </DialogHeader>
                                        <Image
                                            src={member.imageUrl}
                                            alt={member.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-60 object-cover rounded"
                                        />
                                        <p className="text-sm mt-2">Role: {member.role}</p>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}