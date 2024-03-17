"use client"

import { useSearchParams } from "next/navigation";
import PostPreview from "@/components/PostPreview";
import PaginationControl from "./PaginationControl";

export default function Feed(props: {postMetadata: any}) {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ?? "1";

    const POSTS_PER_PAGE = 8;

    const start = (Number(page) - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    const postPreviews = props.postMetadata.map((meatadata: any) => (
      <PostPreview key={meatadata.slug} {...meatadata} />
    )).slice(start, end);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full px-20 py-10 grid gap-2">{ postPreviews }</div>
            <PaginationControl hasPrevPage={start > 0} hasNextPage={end < props.postMetadata.length} total={props.postMetadata.length} />
        </div>
    );
}