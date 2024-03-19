"use client"

import { useSearchParams, usePathname } from "next/navigation";
import { postsPerPage } from "@/utils/paginationConstants";
import PostPreview from "@/components/PostPreview";
import PaginationControl from "./PaginationControl";

export default function Feed(props: {postMetadata: any}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const subject = pathname.split('/')[pathname.split('/').length - 1].toUpperCase();

    const page = Number(searchParams.get("page") ?? "1");
    const POSTS_PER_PAGE = Number(postsPerPage);

    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    if (props.postMetadata) {
        const postPreviews = props.postMetadata.map((meatadata: any) => (
            <PostPreview key={meatadata.slug} {...meatadata} />
        )).slice(start, end);

        return (
            <div className="flex flex-col justify-center items-center md:pl-10 z-0">
                <div className="w-full flex justify-start mb-4">
                    <h2 className="font-light text-xl">{subject} 최신 글</h2>
                </div>
                <div className="w-full mb-10 grid gap-2">{ postPreviews }</div>
                { props.postMetadata.length == 0 ? (
                    <div className="font-bold text-2xl text-gray-500 select-none">아직 작성된 글이 없습니다!</div>
                ) : (
                    <PaginationControl start={start} hasPrevPage={start > 0} hasNextPage={end < props.postMetadata.length} total={props.postMetadata.length} />
                )}
            </div>
        );
    } else {
        return (
            <div className="h-full flex flex-col justify-center items-center md:pl-10 z-0">
                <div className="font-bold text-2xl text-gray-500 select-none">NOTHING FOUND</div>
            </div>
        )
    }
}