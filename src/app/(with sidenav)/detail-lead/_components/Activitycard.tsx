import React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const Activitycard = () => {
  return (
    <div className="flex flex-row gap-[233px] w-[700px] h-[86px]" >
    <div className='w-[251px] h-[68px]'>
        <div className='flex flex-row gap-[28px] py-2 px-3 '>
            <Avatar className='w-[68px] h-[68px]' >
                <AvatarImage src="https://github.com/shadcn.png"/>
                {/* <AvatarFallback>CN</AvatarFallback> */}
            </Avatar>

            <div className='flex flex-row gap-2 items-center w-[150px] h-[65px]'>
                <div className="w-[5px] h-[60px] bg-blue-800 rounded-tr-md rounded-br-md"/>
                <div className='flex flex-col'>
                    <p className="text-stone-900 text-base font-semibold font-['Poppins'] tracking-wide">Call (proposal) </p>
                    <p className="text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wide" >Eya dhen crated this</p>
                    <p className="text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wide">Title client #1</p>

                </div>
            </div>

        </div>


    </div>
    <div className="flex justify-end w-[200px] p-2">
        <p className="text-neutral-400 text-xs font-medium font-['Poppins']">
            last update August 1</p>    
    </div>
</div>
  )
}

export default Activitycard