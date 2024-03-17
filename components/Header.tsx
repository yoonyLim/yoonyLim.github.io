import Link from "next/link";
import DarkmodeSwitch from "./DarkmodeSwitch";

export default function Header() {
    return (
        <header>
            <div className="h-20 px-20 flex items-center justify-between shadow-[0_2px_5px_-1px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,1.0)]">
                <Link 
                    href="/" 
                    className="font-black text-2xl hover:text-gray-500 transition-colors duration-200 ease-in-out"
                >Yoony's Blog</Link>
                <DarkmodeSwitch />
            </div>
        </header>
    );
}