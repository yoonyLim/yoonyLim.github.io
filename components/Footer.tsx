"use client"

import Link from "next/link";
import GitHubLogo from "./GitHubLogo";

export default function Header() {
    return (
        <footer>
            <div className="w-full h-40 px-20 flex items-center border-t-1 dark:border-white">
                <div className="w-full">
                    <Link href="https://github.com/yoonyLim" target="_blank" className="flex items-center">
                        <GitHubLogo />
                        <span className="ml-2">GitHub</span>
                    </Link>
                    <div className="mt-2">© 2024 Hayoon Lim</div>
                </div>
            </div>
        </footer>
    );
}