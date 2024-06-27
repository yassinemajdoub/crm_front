'use client'
import React from 'react'
import {  useSearchParams } from 'next/navigation';
import TimelineActivtyCard from './_components/TimelineActivtyCard';


const DetailLeadNew = () => {
    const searchParams=useSearchParams()
    const view=searchParams.get('view')
    const isOverview = view === 'overview';
    const isTimeline = view === 'timeline';

    return (
        <>
          {isOverview && (
            <div>
              Overview view
            </div>
          )}
          {isTimeline && (
            <div className='flex flex-col gap-4 w-[1100] h-[750px] p-6 mx-7'>
              <p className="text-stone-900 text-2xl font-semibold tracking-wide">Small Dots Timeline</p>
              <div className='w-full h-full'>
                <TimelineActivtyCard/>
                <TimelineActivtyCard/>
                <TimelineActivtyCard/>
                <TimelineActivtyCard/>
                <TimelineActivtyCard/>
                <TimelineActivtyCard/>
              </div>
            </div>
          )}
        </>
      );
    };

export default DetailLeadNew