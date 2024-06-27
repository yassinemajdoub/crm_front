import React from 'react'
import ViewsButtons from './_components/viewsButtons';
import TabsButtons from './_components/TabsButtons';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>)  {
  return (
    <>
        <div className='flex flex-row justify-between w-full h-20 m-7'>
            <ViewsButtons/>
            <TabsButtons />
        </div>
        <div>
            {children}
        </div>
    </>
  )
}
