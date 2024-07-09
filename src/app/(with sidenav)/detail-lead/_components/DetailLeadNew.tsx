'use client'
import React from 'react'
import {  useSearchParams } from 'next/navigation';
import TimelineActivtyCard from '../_components/TimelineActivtyCard';
import { Lead } from '@/sotres/leadsStore';
import InformationsComponent from '../_sections/InformationsComponent';
import { useSideNavStore } from '@/components/shared/SideNav';
import EmailComponent from '../_sections/emailComponent';
import ActivitiesComponent from '../_sections/ActivitiesComponent';
import ContactsComponent from '../_sections/ContactsComponent';

interface DetailLeadNewProps {
  data: Lead | null;
  params:{
    id:string
  } 
}

export default function DetailLeadNew({ data ,params}:DetailLeadNewProps) {
    console.log(data)
    const searchparams=useSearchParams()
    const view=searchparams.get('view')
    const tab=searchparams.get('tab')
    const isInformations = tab === 'Informations';
    const isEmails = tab === 'Emails';
    const isActivities = tab === 'Activities';
    const isContacts = tab === 'Contacts';
    const {isOpen, setIsOpen } = useSideNavStore();
    const isOverview = view === 'overview';
    const isTimeline = view === 'timeline';

    const containerStyles = isOpen
    ? 'w-[1330px] h-[1300px] p-3 m-4'
    : 'w-[1550px] h-[1300px] p-3 m-4';

    return (
        <>
          {isOverview && (
            <div className={containerStyles}>
              {isInformations && <InformationsComponent data={data} params={params} />}
              {isEmails && <EmailComponent data={data} params={params} />}
              {isActivities && <ActivitiesComponent data={data} params={params} />}
              {isContacts && <ContactsComponent data={data} params={params} />} 
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
