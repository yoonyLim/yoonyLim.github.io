"use client"

import Link from "next/link";
import GitHubLogo from "./Icons/GitHubLogo";

export default function Header() {
    return (
        <footer>
            <div className="w-full h-40 px-20 flex items-center shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.16)] dark:shadow-[0_-2px_5px_-1px_rgba(0,0,0,1.0)]">
                <div className="w-full">
                    <Link 
                        href="https://github.com/yoonyLim" 
                        target="_blank" 
                        className="flex items-center fill-[#24292f] hover:fill-gray-400 hover:text-gray-400 dark:fill-white hover:dark:fill-gray-500 hover:dark:text-gray-500 transition-colors duration-200 ease-in-out"
                    >
                        <GitHubLogo />
                        <span className="ml-2 font-black">GitHub</span>
                    </Link>
                    <div className="mt-2 font-black">© 2024 Hayoon Lim</div>
                </div>
            </div>
        </footer>
    );
}