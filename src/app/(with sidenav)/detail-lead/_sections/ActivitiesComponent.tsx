'use client'

import { Lead } from '@/stores/leadsStore';
import React from 'react'
import LeftNavigation from '../_components/activitiesTables/LeftNavigation';

import { useSearchParams } from 'next/navigation';
import CallComponent from '../_components/activitiesTables/CallComponent';
import MeetingComponent from '../_components/activitiesTables/MeetingComponent';
import SmsComponent from '../_components/activitiesTables/SmsComponent';
import OpportunitiesComponent from '../_components/activitiesTables/OpportunitiesComponent';
import TasksComponent from '../_components/activitiesTables/TasksComponent';
import { DatePickerWithRange } from '../_components/activitiesTables/dataRangerPicker';
import { Button } from '@/components/ui/button';
interface ActivitiesLeadNewProps {
    data: Lead | null;
    params:{
        id:string
      } 

  }
  

export default function ActivitiesComponent({ data,params }:ActivitiesLeadNewProps) {
  const searchParams = useSearchParams();
  const currentNav = searchParams.get('navigation') || 'Call';

  const componentMap: { [key: string]: React.ReactNode } = {
    Call: <CallComponent params={params}/>,
    Meeting: <MeetingComponent params={params}/>,
    Sms: <SmsComponent params={params}/>,
    Opportunities: <OpportunitiesComponent params={params} />,
    Tasks: <TasksComponent params={params} />
  };
  return (
    <>
    <div className='flex flex-col items-center gap-3 border-4 '>
          <LeftNavigation/>
        <div>
            {componentMap[currentNav]}
        </div>
    </div>
    </>
  )
}
