"use client"

import { useRouter } from "next/navigation";

export default function PostsPage(props: any) {
    const router = useRouter()
    router.push('/');

    return (
        <>bye-bye</>
    )
}