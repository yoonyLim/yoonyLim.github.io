"use client"

import Link from "next/link";
import GitHubLogo from "./Icons/GitHubLogo";
import YouTubeLogo from "./Icons/YouTubeLogo";

export default function Header() {
    return (
        <footer className="static bottom-0 w-full bg-white dark:bg-[#181818]">
            <div className="w-full h-48 xl:h-40 px-10 xl:px-20 flex items-center shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.16)] dark:shadow-[0_-2px_5px_-1px_rgba(0,0,0,1.0)]">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-8">
                        <Link 
                            href="https://github.com/yoonyLim" 
                            target="_blank" 
                            className="w-fit flex items-center fill-[#24292f] hover:fill-gray-400 hover:text-gray-400 dark:fill-white hover:dark:fill-gray-500 hover:dark:text-gray-500 transition-colors duration-200 ease-in-out"
                        >
                            <GitHubLogo />
                            <span className="ml-2">Yoony's GitHub</span>
                        </Link>
                        <Link 
                            href="https://www.youtube.com/channel/UCbuW4VUdB2cxdRw8qGmTdTw" 
                            target="_blank" 
                            className="w-fit flex items-center fill-[#24292f] hover:fill-gray-400 hover:text-gray-400 dark:fill-white hover:dark:fill-gray-500 hover:dark:text-gray-500 transition-colors duration-200 ease-in-out"
                        >
                            <YouTubeLogo />
                            <span className="ml-2">Yoony's YouTube</span>
                        </Link>
                    </div>
                    <div className="mt-2 font-bold">© 2024 Hayoon Lim</div>
                </div>
            </div>
        </footer>
    );
}