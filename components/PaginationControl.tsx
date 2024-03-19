"use client"

import { postsPerPage, buttonsPerPagination } from "@/utils/paginationConstants";
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ButtonGroup, Button } from "@nextui-org/react"
import { ChevronIcon } from "./Icons/ChevronIcon";

export default function PaginationControl(props: {start: Number, hasPrevPage: boolean, hasNextPage: boolean, total: number}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const POSTS_PER_PAGE = Number(postsPerPage);
    const BUTTONS_PER_PAGINATION = Number(buttonsPerPagination);
    const HALF_PAGINATION = Math.floor(BUTTONS_PER_PAGINATION / 2);

    const page = Number(searchParams.get("page") ?? "1");

    const numPages = Math.ceil(props.total / POSTS_PER_PAGE);

    // check if the page is valid page number
    if (page > numPages) {
        router.push(`${pathname}/?page=1`);
    }
    
    const pageButtons = [];

    // the page number buttons will only render current to number of (current + BUTTONS_PER_PAGINATION) buttons for the sake of width in smaller screens
    if (page - HALF_PAGINATION > 1) {
        pageButtons.push(
            <Button
                key="0"
                isDisabled={true}
                className="font-black"
            >...</Button>
        )
    }

    for (let i = page; i <= numPages + HALF_PAGINATION; i++) {
        if (i > HALF_PAGINATION && i < page + BUTTONS_PER_PAGINATION) {
            pageButtons.push(
                <Button
                    key={i - HALF_PAGINATION}
                    isDisabled={page == i - HALF_PAGINATION}
                    onClick={() => {
                        router.push(`${pathname}/?page=${i - HALF_PAGINATION}`)
                    }}
                    className="font-black"
                >{i - HALF_PAGINATION}</Button>
            )
        }
    }

    if (page < numPages - HALF_PAGINATION && BUTTONS_PER_PAGINATION % 2 == 1) {
        pageButtons.push(
            <Button
                key="-1"
                isDisabled={true}
                className="font-black"
            >...</Button>
        )
    }

    if (page <= numPages - HALF_PAGINATION && BUTTONS_PER_PAGINATION % 2 == 0) {
        pageButtons.push(
            <Button
                key="-1"
                isDisabled={true}
                className="font-black"
            >...</Button>
        )
    }

    return (
        <div className="h-10 z-0">
            <ButtonGroup
                radius="sm"
                size="md"
                isIconOnly={true}
            >
                <Button
                    isDisabled={!props.hasPrevPage}
                    onClick={() => {
                        router.push(`${pathname}/?page=1`);
                    }}
                >
                    <div className="fill-black dark:fill-white"><ChevronIcon /></div>
                    <div className="fill-black dark:fill-white"><ChevronIcon /></div>
                </Button>
                <Button 
                    isDisabled={!props.hasPrevPage}
                    onClick={() => {
                        router.push(`${pathname}/?page=${Number(page) - 1}`);
                    }}
                ><div className="fill-black dark:fill-white"><ChevronIcon /></div></Button>
                { pageButtons }
                <Button 
                    isDisabled={!props.hasNextPage}
                    onClick={() => {
                        router.push(`${pathname}/?page=${Number(page) + 1}`);
                    }}
                ><div className="rotate-180 fill-black dark:fill-white"><ChevronIcon /></div></Button>
                <Button
                    isDisabled={!props.hasNextPage}
                    onClick={() => {
                        router.push(`${pathname}/?page=${numPages}`);
                    }}
                >
                    <div className="rotate-180 fill-black dark:fill-white"><ChevronIcon /></div>
                    <div className="rotate-180 fill-black dark:fill-white"><ChevronIcon /></div>
                </Button>
            </ButtonGroup>
        </div>
    )
}