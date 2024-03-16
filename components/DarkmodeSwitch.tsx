"use client"

import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";

export default function DarkmodeSwitch() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(resolvedTheme === "dark" ? true : false);

    useEffect(() => {
        setMounted(true);
    });

    useEffect(() => {
        isDark ? setTheme("dark") : setTheme("light");
    }, [isDark]);

    if(!mounted) return null;

    return (
        <div>
            <Switch 
            defaultSelected
            isSelected={isDark}
            onValueChange={setIsDark} 
            color="default"
            size="lg" 
            startContent={<MoonIcon />}
            endContent={<SunIcon />}
            >Dark Mode: {isDark ? "on" : "off"}</Switch>
        </div>
    );
}