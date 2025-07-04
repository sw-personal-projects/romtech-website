import { Button } from "../ui/button";
import { ProjectsSlider } from "./project-slider";
import PopUp from "../animations/pop-up";
import FlipIn from "../animations/flip-in";
import Link from "next/link";
import { getProjects } from "@/actions/project/project-actions";

export const dynamic = "force-dynamic";

export default async function OurProjectSection() {
    const projectData = await getProjects();

    if (!projectData) {
        return <div>No projects found</div>
    }
    return (
        <div className="min-h-[50vh]">
            <div className="container md:mt-[150px] mt-[50px] mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="col-span-1 h-full flex flex-col justify-center">
                        <PopUp delay={0.2}>
                            <h2 className="text-4xl md:text-6xl font-bold font-[Poppins] text-primary text-center md:text-start">
                                Our <br className="hidden md:block" /> Projects
                            </h2>
                        </PopUp>
                        <PopUp delay={0.4}>
                            <p className="text-primary/80 mt-3 text-sm text-center md:text-start">
                                Our projects are a testament to our commitment to delivering innovative and effective solutions
                                to our clients.
                            </p>
                            <Link href='/our-projects'>
                                <Button variant='outline' className="mt-10 w-full py-6 text-lg"
                                >
                                    Explore Projects
                                </Button>
                            </Link>

                        </PopUp>

                    </div>

                    <div className="md:col-span-3 h-full md:pl-[100px] mt-5 md:mt-0">
                        <FlipIn delay={0.3}>
                            {projectData && (
                                <ProjectsSlider projects={projectData} />
                            )}
                        </FlipIn>

                    </div>
                </div>
            </div>
        </div>
    )
}
