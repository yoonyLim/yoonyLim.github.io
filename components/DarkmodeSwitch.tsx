"use client"

import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";
import { useTheme } from "next-themes";

export default function DarkmodeSwitch() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(resolvedTheme === "dark" ? true : false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        isDark ? setTheme("dark") : setTheme("light");
    }, [isDark]);

    if(!mounted) return null;

    return (
        <div className="flex justify-center">
            <Switch 
                defaultSelected
                isSelected={isDark}
                onValueChange={setIsDark} 
                color="default"
                size="lg" 
                startContent={<MoonIcon />}
                endContent={<SunIcon />}
            ></Switch>
            <div className="flex flex-col items-center select-none">
                <span className="dark:text-gray-500 text-xs font-light">Dark Mode</span>
                <span className="text-sm font-bold">{isDark ? "ON" : "OFF"}</span>
            </div>
        </div>
    );
}