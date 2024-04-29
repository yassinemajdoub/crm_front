import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="m-10">
            <div className='mb-14 justify-between flex flex-row'>
                <h1 className="text-[#202020] font-semibold text-[24px]">Email Template</h1>
                <div>
                    <Button className='py-2 bg-[#1D1DCE] text-[#DBE7FF] text-center font-semibold text-[14px] ' >+ HTML Template</Button>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;