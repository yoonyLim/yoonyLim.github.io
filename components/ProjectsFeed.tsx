"use client"

import ProjectPreview from "@/components/ProjectPreview";
import { postsPerPage } from "@/utils/paginationConstants";
import { useSearchParams } from "next/navigation";
import PaginationControl from "@/components/PaginationControl";

export default function ProjectsFeed(props: {projectsList: any}) {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") ?? "1");
    const POSTS_PER_PAGE = Number(postsPerPage);

    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    // sort desc order
    props.projectsList.projects.sort((a: any, b: any) => {
        return Number(b.year) - Number(a.year);
    })

    const projects = [];

    for (var i = 0; i < props.projectsList.projects.length; i++) {
        projects.push(
            <ProjectPreview 
                key={i}
                name={props.projectsList.projects[i].name} 
                url={props.projectsList.projects[i].url} 
                year={props.projectsList.projects[i].year} 
                description={props.projectsList.projects[i].description}  
                techStacks={props.projectsList.projects[i].techStacks}
            />
        )
    }

    return (
        <div className="flex flex-col justify-center items-center md:pl-10">
                <div className="w-full flex justify-start mb-4">
                    <h2 className="font-light text-xl">최신 프로젝트</h2>
                </div>
                <div className="w-full mb-10 grid gap-2">{ projects }</div>
                { props.projectsList.projects.length == 0 ? (
                <div className="font-bold text-2xl text-gray-500 select-none">아직 작성된 글이 없습니다!</div>
                ) : (
                    <PaginationControl start={start} hasPrevPage={start > 0} hasNextPage={end < projects.length} total={projects.length} />
                )}
        </div>
    )
}