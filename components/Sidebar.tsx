import fs from "fs";
import Link from "next/link";

export default function Sidebar() {
    const root = "mdposts/";
    const subjects = fs.readdirSync(root);

    const subjectTags = [];
    var numPosts = 0;

    for (var subject of subjects) {
        const files = fs.readdirSync(root + subject + "/");
        numPosts += files.filter((file) => file.endsWith(".md")).length;
        subjectTags.push(
            <Link 
                href={`/posts/${subject}`}
                className="flex justify-center items-center py-1 pl-2 pr-4 rounded-full bg-gray-300 dark:bg-gray-500 hover:bg-gray-500 hover:dark:bg-gray-700 transition duration-200 ease-in-out"
            >
                <span className="ml-2 text-sm text-black dark:text-white">{ subject.toUpperCase() }</span>
            </Link>
        )
    }

    return (
        <div className="shrink-0 hidden md:flex flex-col">
            <span className="font-bold text-2xl">Hayoon Lim / 임하윤</span>
            <span className="font-light">경희대학교 소프트웨어융합학과 21학번</span>
            <div className="mt-8 flex flex-col text-gray-500">
                <span>총 { subjects.length }개의 블로그 주제</span>
                <div className="my-2 flex space-x-2">
                    { subjectTags }
                </div>
                <span className="mt-4">총 { numPosts }개의 포스트</span>
            </div>
        </div>
    );
}