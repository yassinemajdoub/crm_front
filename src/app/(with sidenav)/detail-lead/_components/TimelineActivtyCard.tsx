import React from 'react'
import { FaRegCircle } from "react-icons/fa";

const TimelineActivtyCard = () => {
  return (
        <div className='flex flex-row w-full h-[120px]'>
            <div className='w-10 h-full flex flex-col items-center'>
                <FaRegCircle size={22} color="blue"/>
                <div className='w-0.5 h-full bg-gray-200'></div>
            </div>
            <div className='flex flex-col gap-2 w-full h-full px-4 pt-2'>
                <p className='text-xl font-semibold'>Activity 1</p>
                <p className="text-zinc-500 text-xs font-medium tracking-wide">Date here Date here Date here Date here Date here Date here Date here</p>
                <p className="text-zinc-500 text-xs font-medium tracking-wide">Description here Description here Description here Description here Description here</p>
            </div>
        </div>
  )
}

export default TimelineActivtyCard