"use client"

import React, { useEffect, useState } from 'react'
import {  Meeting,fetchMeetingsByLeadId } from '../../utils/fetchActivites';
import CardActivity from './Card';


interface MeetingLeadProps {
  params:{
    id:string
  } 
}

export default function MeetingComponent({params}:MeetingLeadProps){
  // const data = await getMeetingByleadId(params.id);
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { data, error } = await fetchMeetingsByLeadId({ id: params.id });
        if (error) {
          console.error('Error fetching meetings:', error);
          // Handle error state or feedback to user
        } else {
          setMeetings(data);
          console.log("meetings",data) // Update state with fetched meetings data
        }
      } catch (error) {
        console.error('Error in fetchMeetings useEffect:', error);
        // Handle error state or feedback to user
      }
    };

    fetchMeetings(); // Call the async function inside useEffect
  }, [params.id]);

  return (
    <div className='flex'>
      <CardActivity />
    </div>
  )
}

