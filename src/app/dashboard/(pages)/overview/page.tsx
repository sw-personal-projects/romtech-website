import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
    title: "Dashboard | Overview",
}

export default function Overview() {
    return (
        <div className="h-screen mt-4">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}