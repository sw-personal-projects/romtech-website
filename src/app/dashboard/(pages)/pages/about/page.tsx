import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import React, { Suspense } from "react"
import AddTeamDialogBox from "./_components/add-team-dialog-box"
import { TeamMemberList } from "./_components/team-member-list"
import { Skeleton } from "@/components/ui/skeleton"


export const metadata = {
    title: "Dashboard | About",
}

export default async function About() {
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
            </Card>
            {/* Team Members */}
            <div className="w-full mt-6">
                <Card>
                    <CardHeader className="flex justify-between items-center border-b border-primary/30">
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
                        <Suspense fallback={
                            <div className="grid grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <Skeleton key={index} className="w-full h-[280px] bg-primary/55 rounded-lg relative group overflow-hidden cursor-pointer p-0" />
                                ))}
                            </div>
                        }>
                            <TeamMemberList />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}