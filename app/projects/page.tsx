import projectsList from "@/utils/projectsList.json"
import ProjectsFeed from "@/components/ProjectsFeed";
import { Suspense } from "react";

export default function ProjectsPage() {
    return (
        <Suspense>
            <ProjectsFeed projectsList={projectsList} />
        </Suspense>
    )
}