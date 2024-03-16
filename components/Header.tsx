import Link from "next/link";
import DarkmodeSwitch from "./DarkmodeSwitch";

export default function Header() {
    return (
        <header>
            <div className="h-20 px-20 flex items-center justify-between border-b-1 dark:border-white">
                <Link href="/">Yoony's Blog</Link>
                <DarkmodeSwitch />
            </div>
        </header>
    );
}