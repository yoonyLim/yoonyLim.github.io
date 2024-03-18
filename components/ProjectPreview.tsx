import Link from "next/link";
import { ProjectMetadata } from "@/utils/ProjectMetadata";

export default function ProjectPreview(props: ProjectMetadata) {
    return (
        <div className="rounded shadow-[0_2px_5px_-1px_rgba(0,0,0,0.16)] hover:shadow-[0_2px_5px_3px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,1.0)] dark:hover:shadow-[0_2px_5px_3px_rgba(0,0,0,1.0)] hover:text-gray-500 dark:hover:text-gray-400 transition duration-200 ease-in-out">
            <Link href={props.url} target="_blank">
                <div className="p-4">
                    <span className="font-light text-sm">{ props.year }</span>
                    <h2 className="font-bold text-2xl">{ props.name }</h2>
                    <span>{ props.description }</span>
                </div>
            </Link>
        </div>
    );
}