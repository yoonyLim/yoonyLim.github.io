"use client"

import projectsList from "@/utils/projectsList.json"
import ProjectPreview from "@/components/ProjectPreview";
import { postsPerPage } from "@/utils/paginationConstants";
import { useSearchParams } from "next/navigation";
import PaginationControl from "@/components/PaginationControl";
import { Suspense } from "react";

export default function ProjectsPage() {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") ?? "1");
    const POSTS_PER_PAGE = Number(postsPerPage);

    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    const projects = [];

    for (var i = 0; i < projectsList.projects.length; i++) {
        projects.push(
            <ProjectPreview key={i} name={projectsList.projects[i].name} url={projectsList.projects[i].url} year={projectsList.projects[i].year} description={projectsList.projects[i].description}  />
        )
    }

    return (
        <div className="flex flex-col justify-center items-center md:pl-10">
            <Suspense>
                <div className="w-full flex justify-start mb-4">
                    <h2 className="font-light text-xl">최신 프로젝트</h2>
                </div>
                <div className="w-full mb-10 grid gap-2">{ projects }</div>
                { projectsList.projects.length == 0 ? (
                <div className="font-bold text-2xl text-gray-500 select-none">아직 작성된 글이 없습니다!</div>
                ) : (
                    <PaginationControl start={start} hasPrevPage={start > 0} hasNextPage={end < projects.length} total={projects.length} />
                )}
            </Suspense>
        </div>
    )
}