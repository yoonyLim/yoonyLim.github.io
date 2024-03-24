import Link from "next/link";
import { ProjectMetadata } from "@/utils/ProjectMetadata";

export default function ProjectPreview(props: ProjectMetadata) {
    const techStacks = [];

    for (var i = 0; i < props.techStacks.length; i++) {
        techStacks.push(
            <div
                key={i} 
                className="flex justify-center items-center pr-2 rounded-full bg-gray-300 dark:bg-gray-500"
            >
                <span className="ml-2 text-sm text-black dark:text-white">{ props.techStacks[i] }</span>
            </div>
        );
    }

    return (
        <div className="rounded shadow-[0_2px_5px_-1px_rgba(0,0,0,0.16)] hover:shadow-[0_2px_5px_3px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,1.0)] dark:hover:shadow-[0_2px_5px_3px_rgba(0,0,0,1.0)] hover:text-gray-500 dark:hover:text-gray-400 hover:translate-x-5 transition duration-200 ease-in-out">
            <Link href={props.url} target="_blank">
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <span className="font-light text-sm">{ props.year }</span>
                        <div className="flex items-center space-x-2">
                        { techStacks }
                        </div>
                    </div>
                    <h2 className="font-bold text-2xl">{ props.name }</h2>
                    <span>{ props.description }</span>
                </div>
            </Link>
        </div>
    );
}