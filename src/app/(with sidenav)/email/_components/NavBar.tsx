"use client"
import React from 'react';
import { redirect } from 'next/navigation';

const categories = [
    "my",
    "simple",
    "promotion",
    "welcome",
    "newsletter",
    "devis",
    "form",
    "navigasi",
    "layout"
]
const NavBar: React.FC<{ selectedCategory: string }> = ({ selectedCategory }) => {
    if (!categories.includes(selectedCategory)) {
        redirect('not-found');
    }

    return (
        <div className='flex flex-row gap-14 bg-[#017EFA1A] w-full py-4 px-11 rounded-[10px]'>
            {
                categories.map((category, index) => (
                    <a href={`/email/${category}`} key={index}>
                        <div 
                            className={` rounded-xl w-fit px-4 py-2 capitalize ${selectedCategory === category ? 'bg-[#1D1DCE] text-white font-semibold' : 'text-[#25273FB2] cursor-pointer hover:bg-[#333333] hover:text-white hover:font-semibold'}`} 
                        >
                            {category}
                        </div>
                    </a>
                ))
            }
        </div>
    );
};

export default NavBar;