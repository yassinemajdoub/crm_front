'use client'
import React from 'react'
import LeadMainInfo from './_components/LeadMainInfo'
import LeadDetailsHeadBar from './_components/headBar'
import NavigationRight from './_components/NavigationRight'

import LeftNavigation from './_components/LeftNavigation'
import Activitycard from './_components/Activitycard'

const page = () => {

  return (
    <div className="flex flex-col gap-2 h-screen overflow-y-auto" >
        <LeadDetailsHeadBar />
        <LeadMainInfo />
        <div className='flex flex-row'>
            {/* <NavigationRight /> */}
            <NavigationRight />
             {/* <NavigationLeft /> */}
            <div className='flex flex-col w-full h-full'>
             <div className='flex flex-col'>
                <LeftNavigation />

                <div className='w-[700px] h-full border' >
                    <Activitycard />
                    <Activitycard />
                    <Activitycard />
                    <Activitycard />
                    <Activitycard />
                    <Activitycard />

                </div>
        </div>
    </div>
   </div>
</div>
  )
}

export default page