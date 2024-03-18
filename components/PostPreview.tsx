import Link from "next/link";
import { PostMetadata } from "@/utils/PostMetadata";
import { ClockIcon } from "./Icons/ClockIcon";

export default function PostPreview(props: PostMetadata) {
    return (
    <div className="rounded shadow-[0_2px_5px_-1px_rgba(0,0,0,0.16)] hover:shadow-[0_2px_5px_3px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,1.0)] dark:hover:shadow-[0_2px_5px_3px_rgba(0,0,0,1.0)] hover:text-gray-500 dark:hover:text-gray-400 transition duration-200 ease-in-out">
      <Link href={`/posts/${props.subject}/${props.slug}`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-light text-sm">{ props.date }</span>
            <div className="flex justify-center items-center pr-2 rounded-full bg-gray-300 dark:bg-gray-500">
              <span className="ml-2 text-sm text-black dark:text-white">{ props.subject.toUpperCase() }</span>
            </div>
          </div>
          <h2 className="mt-2 font-bold text-2xl truncate">{ props.title }</h2>
          <div className="flex justify-between font-light">
            <span className="truncate">{ props.subtitle }</span>
            <div className="hidden sm:flex items-center fill-black dark:fill-white">
              <ClockIcon />
              <span className="ml-2 text-black dark:text-white">{ props.readingTime } min read</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
    );
}