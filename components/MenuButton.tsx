"use client"

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { MenuIcon } from './Icons/MenuIcon';
import { CloseIcon } from './Icons/CloseIcon';
import DarkmodeSwitch from './DarkmodeSwitch';
import Link from 'next/link';

export default function MenuButton(props: any) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const subLinks = [];

    for (let i = 0; i < Object.keys(props).length; i++) {
        if (props[i] != "projects")
            subLinks.push(
                <Link 
                    key={i}
                    href={`/posts/${props[i]}`} 
                    className='hover:text-gray-500 transition-colors duration-200 ease-in-out'
                    onClick={() => {
                        setIsMenuOpened(false);
                    }}
                >{props[i].charAt(0).toUpperCase() + props[i].slice(1)}</Link>
            )
    }

    return (
        <div className="flex xl:hidden">
            <Button 
                onClick={() => {
                    setIsMenuOpened(!isMenuOpened);
                }}
                isIconOnly={true}
                variant='light'
                className='flex xl:hidden fill-black dark:fill-white'
            >
                {
                    isMenuOpened ? (
                        <CloseIcon />
                    ) : (
                        <MenuIcon />
                    )
                }
            </Button>
            {
                isMenuOpened ? (
                    <div className='absolute top-20 left-0 z-[1300] px-10 py-8 w-full flex flex-col font-bold text-lg bg-white dark:bg-[#181818] shadow-[0_2px_5px_-1px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,1.0)]'>
                        <div className='flex w-full justify-end'>
                            <DarkmodeSwitch />
                        </div>
                        <div className='mt-4 flex flex-col'>
                            <Link 
                                href="/about"
                                onClick={() => {
                                    setIsMenuOpened(false);
                                }}
                                className="w-fit hover:text-gray-500 transition-colors duration-200 ease-in-out"
                            >About</Link>
                            <Link 
                                href="/projects"
                                onClick={() => {
                                    setIsMenuOpened(false);
                                }}
                                className="mt-4 w-fit hover:text-gray-500 transition-colors duration-200 ease-in-out"
                            >Projects</Link>
                            <hr className="mt-8 h-px border-0 bg-gray-300 dark:bg-gray-600" />
                        </div>
                        <div className='flex flex-col w-fit mt-8 space-y-4'>
                            { subLinks }
                        </div>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
}