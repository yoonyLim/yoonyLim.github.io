"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@nextui-org/react"

export default function PaginationControl(props: {hasPrevPage: boolean, hasNextPage: boolean}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const POSTS_PER_PAGE = 8;

    const page = searchParams.get("page") ?? "1";

    return (
        <div className="h-20 flex">
            <Button 
                isDisabled={!props.hasPrevPage}
                onClick={() => {
                    router.push(`/?page=${Number(page) - 1}`);
                }}
            >Prev</Button>
            <div className="w-10"></div>
            <Button 
                isDisabled={!props.hasNextPage}
                onClick={() => {
                    router.push(`/?page=${Number(page) + 1}`);
                }}
            >Next</Button>
        </div>
    )
}