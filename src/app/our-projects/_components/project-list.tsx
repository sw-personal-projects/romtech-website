import { getProjects } from "@/actions/project/project-actions";
import { ProjectGrid } from "./project-card";

export default async function ProjectList() {
    const projectData = await getProjects();
    if (!projectData) {
        return <div>No projects found</div>
    }
    return (
        <div>
            <ProjectGrid projects={projectData} />
        </div>
    )
}