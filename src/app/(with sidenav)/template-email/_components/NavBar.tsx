"use client"
import React from 'react';
import { redirect } from 'next/navigation';
import { TemplateCategory } from '../utils/fetchTemplates';

// const categories = [
//     "my",
//     "simple",
//     "promotion",
//     "welcome",
//     "newsletter",
//     "devis",
//     "form",
// ]
const NavBar: React.FC<{ selectedCategory: string, data:TemplateCategory[] }> = ({ selectedCategory ,data}) => {
    const categories = data.map(category => category.name);

    if (!categories.includes(selectedCategory)) {
        redirect('/not-found');
    }

    return (
        <div className='flex flex-row gap-14 bg-[#017EFA1A] w-full py-4 px-11 rounded-[10px]'>
            {
                categories.map((category, index) => (
                    <a href={`/email/${category}`} key={index}>
                        <div 
                            className={` rounded-xl w-fit px-4 py-2 capitalize ${selectedCategory === category ? 'bg-[#1D1DCE] text-white font-semibold' : 'text-[#25273FB2] cursor-pointer hover:bg-[#1D1DCE] hover:text-white hover:font-semibold'}`} 
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