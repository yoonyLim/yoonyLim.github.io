"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ButtonGroup, Button } from "@nextui-org/react"
import { ChevronIcon } from "./Icons/ChevronIcon";

export default function PaginationControl(props: {hasPrevPage: boolean, hasNextPage: boolean, total: number}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const POSTS_PER_PAGE = 8;

    const page = searchParams.get("page") ?? "1";

    const numPages = Math.ceil(props.total / POSTS_PER_PAGE);
    
    const pageButtons = [];

    for (let i = 0; i < numPages; i++) {
        pageButtons.push(
            <Button
                key={i}
                isDisabled={Number(page) == i + 1}
                onClick={() => {
                    router.push(`/?page=${i + 1}`)
                }}
                className="font-black"
            >{i + 1}</Button>
        )
    }

    return (
        <div className="h-20">
            <ButtonGroup>
                <Button
                    isDisabled={!props.hasPrevPage}
                    onClick={() => {
                        router.push("/?page=1");
                    }}
                >
                    <div className="fill-black dark:fill-white"><ChevronIcon /></div>
                    <div className="fill-black dark:fill-white"><ChevronIcon /></div>
                </Button>
                <Button 
                    isDisabled={!props.hasPrevPage}
                    onClick={() => {
                        router.push(`/?page=${Number(page) - 1}`);
                    }}
                ><div className="fill-black dark:fill-white"><ChevronIcon /></div></Button>
                { pageButtons }
                <Button 
                    isDisabled={!props.hasNextPage}
                    onClick={() => {
                        router.push(`/?page=${Number(page) + 1}`);
                    }}
                ><div className="rotate-180 fill-black dark:fill-white"><ChevronIcon /></div></Button>
                <Button
                    isDisabled={!props.hasNextPage}
                    onClick={() => {
                        router.push(`/?page=${numPages}`);
                    }}
                >
                    <div className="rotate-180 fill-black dark:fill-white"><ChevronIcon /></div>
                    <div className="rotate-180 fill-black dark:fill-white"><ChevronIcon /></div>
                </Button>
            </ButtonGroup>
        </div>
    )
}