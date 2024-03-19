import getPostContent from "@/utils/getPostContent";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

export default function Sidebar() {
    const root = "mdposts/";
    const subjects = fs.readdirSync(root);

    const subjectTags = [];
    var numPosts = 0;

    for (var subject of subjects) {
        if (subject != "projects") {
            const files = fs.readdirSync(root + subject + "/");
            numPosts += files.filter((file) => file.endsWith(".md")).length;
            subjectTags.push(
                <Link 
                    href={`/posts/${subject}`}
                    className="flex items-center mt-2 mr-2 py-1 px-4 rounded-full bg-gray-300 dark:bg-gray-500 hover:bg-gray-500 hover:dark:bg-gray-700 hover:scale-110 transition duration-200 ease-in-out"
                >
                    <span className="text-sm text-black dark:text-white">{ subject.toUpperCase() }</span>
                </Link>
            )
        }
    }

    return (
        <div className="shrink-0 hidden xl:flex flex-col max-w-72">
            <span className="font-bold text-2xl select-none">Hayoon Lim / 임하윤</span>
            <span className="font-light select-none">경희대학교 소프트웨어융합학과 21학번</span>
            <div className="mt-8 flex flex-col text-gray-500">
                <span className="select-none">총 { subjects.length }개의 블로그 주제</span>
                <div className="flex flex-wrap">
                    { subjectTags }
                </div>
                <span className="mt-8 select-none">총 { numPosts }개의 포스트</span>
            </div>
        </div>
    );
}