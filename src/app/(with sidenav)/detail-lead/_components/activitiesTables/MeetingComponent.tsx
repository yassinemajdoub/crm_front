"use client"

import React, { useEffect, useState } from 'react'
import {  Meeting,fetchMeetingsByLeadId } from '../../utils/fetchActivites';
import { useForm, SubmitHandler } from 'react-hook-form';
import CardActivity from './Card';
import { DatePickerWithRange } from './dataRangerPicker';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import { makeAxiosGqlRequest } from '@/lib/axios';
import { IoIosClose } from 'react-icons/io';

interface MeetingLeadProps {
  params:{
    id:string
  } 
}

type MeetingFormInputs = {
  body: string;
};

export default function MeetingComponent({params}:MeetingLeadProps){
  // const data = await getMeetingByleadId(params.id);
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [isOpen, setIsSideNavOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MeetingFormInputs>();
  const userId = getCookie("id");
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

  useEffect(() => {
    fetchMeetings(); // Call the async function inside useEffect
  }, [params.id]);

  const handleOpenSideNav = () => {
    setIsSideNavOpen(true);
  };

  const handleCloseSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<MeetingFormInputs> = async (data: MeetingFormInputs) => {
    console.log(data);
    const mutationString = `
      mutation {
        createMeeting(
          leadId: "${params.id}",
          createdBy: "${userId}",
          body: """${data.body}"""
        ) {
          meeting {
            id
          }
        }
      }
    `;

    console.log(mutationString);

    const response = await makeAxiosGqlRequest(mutationString);
    console.log(response);
    const { error } = response;
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Meeting added successfully");
      handleCloseSideNav();
    }
  };

  return (
    <>
    <div className='flex flex-col items-center gap-3'>
      <div className='flex w-[700px] justify-between'>
        <DatePickerWithRange/>
        <Button onClick={handleOpenSideNav} className='flex gap-2 text-white bg-blue-800 hover:bg-blue-600'>
          Add Meeting
        </Button>
      </div>
      <div className='flex ml-[150px] w-[1000px] flex-wrap gap-4'>
        
        {meetings ? (
          meetings.map((meeting) => (
            <CardActivity 
            key={meeting.id} 
            createdBy={meeting.createdBy} 
            createdAt={meeting.createdAt} 
            body={meeting.body}  />
          ))
        ) : (
          <p>Loading meetings...</p>
        )}
      </div>
      </div>
      <div
      className={`fixed top-0 right-0 h-full w-full transition-transform ${
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      <div className="absolute top-0 right-0 h-full w-[721px] shadow-lg bg-white p-28">
        <section className='flex flex-col'>
          <div className='flex justify-between items-center'>
            <div className="w-[274px] text-black text-xl font-medium leading-[25px]">Add Meeting</div>
            <button onClick={handleCloseSideNav}><IoIosClose className='w-10 h-8'/></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="text-black text-base font-medium">Content</label>
              <textarea
                id="content"
                {...register("body", { required: "Content is required" })}
                className="p-2 border border-gray-300 rounded h-32"
              />
              {errors.body && <span className="text-red-600">{errors.body.message}</span>}
            </div>
            <div className='flex justify-end gap-3'>
              <Button
                type="button"
                className="flex w-[107px] mt-4 p-2 bg-gray-200 text-black rounded hover:bg-blue-600"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="flex w-[107px] mt-4 p-2 bg-blue-200 text-black rounded hover:bg-blue-600"
              >
                Add Meeting
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </>
  )
}

