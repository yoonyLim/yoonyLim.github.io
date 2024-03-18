"use client"

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { MenuIcon } from './Icons/MenuIcon';
import DarkmodeSwitch from './DarkmodeSwitch';

export default function MenuButton(props: any) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const subLinks = [];

    return (
        <div>
            <Button 
                onClick={() => {
                    setIsMenuOpened(!isMenuOpened);
                }}
                isIconOnly={true}
                variant='light'
                className='flex xl:hidden fill-black dark:fill-white'
            >
                <MenuIcon />
            </Button>
            <div className='absolute top-20 left-0 px-20 py-8 w-full flex flex-col bg-white dark:bg-[#181818] shadow-[0_2px_5px_-1px_rgba(0,0,0,0.16)] dark:shadow-[0_2px_5px_-1px_rgba(0,0,0,1.0)]'>
                <div className='flex w-full justify-end'>
                    <DarkmodeSwitch />
                </div>
            </div>
        </div>
    )
}