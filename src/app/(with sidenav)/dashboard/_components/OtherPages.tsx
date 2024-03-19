"use client"

import { ChevronLeftIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function OtherPages() {
    //TODO make the pagination system 

    // const numberOfPages = folders.length / 14

    //TODO make this come from context

    const pages = [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }]
    const [selectedPage, setSelectedPage] = useState(1)

    return <div className="flex mt-[10px] w-full justify-end  py-[30px] items-center gap-[4px] max-h-[30px]">
        <ChevronLeftIcon className='hover:cursor-pointer rounded-[8px] dark:bg-black h-[39px]  w-[38px] p-[8px] hover:scale-110' onClick={() => setSelectedPage(prev => prev - 1)} />
        {pages.map(page => (
            <Button key={page.number} onClick={() => setSelectedPage(page.number)} className={cn(' hover:-translate-y-[2px] transition-transform dark:bg-black dark:text-white h-[38px] w-[35px]  bg-white hover:bg-black/10 text-black', { " hover:bg-black/80 text-white  bg-[#1D1DCE]": selectedPage === page.number })} >{page.number}</Button>
        ))}
        <ChevronRight className='hover:cursor-pointer rounded-[8px] dark:bg-black h-[38px] w-[38px] p-[8px]  hover:scale-110' onClick={() => setSelectedPage(prev => prev + 1)} />
    </div>
}