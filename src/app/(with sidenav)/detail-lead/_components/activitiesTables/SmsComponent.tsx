"use client"

import React, { useEffect, useState } from 'react'
import {  SMSMessage,fetchSMSMessagesByLeadId,SMSTemplate,fetchSMSTemplates } from '../../utils/fetchActivites';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import CardActivity from './Card';
import Select from 'react-select';
import { DatePickerWithRange } from './dataRangerPicker';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import { makeAxiosGqlRequest } from '@/lib/axios';
import { IoIosClose } from 'react-icons/io';

interface SMSLeadProps {
  params:{
    id:string
  } 
}

type SMSFormInputs = {
  body: string;
  smsTemplateId?: SMSTemplate;
  title: string;
};

export default function  SmsComponent({params}:SMSLeadProps){
  const [smsList, setsmsList] = useState<SMSMessage[] | null>(null);
  const [isOpen, setIsSideNavOpen] = useState(false);
  const [tempaltes, settempaltes] = useState<SMSTemplate[] | null>(null);
  const { register, handleSubmit,control, formState: { errors }, reset } = useForm<SMSFormInputs>();
  const userId = getCookie("id");  
    const fetchsmsList = async () => {
      try {
        const { data, error } = await fetchSMSMessagesByLeadId({ id: params.id });
        if (error) {
          console.error('Error fetching calls:', error);
          // Handle error state or feedback to user
        } else {
          setsmsList(data);
          console.log("calls", data); // Update state with fetched calls data
        }
      } catch (error) {
        console.error('Error in fetchCalls useEffect:', error);
        // Handle error state or feedback to user
      }
    };
    const fetchsmsTemplates = async () => {
      try {
        const { data, error } = await fetchSMSTemplates({ id: params.id });
        if (error) {
          console.error('Error fetching calls:', error);
          // Handle error state or feedback to user
        } else {
          settempaltes(data);
          console.log("templates", data); // Update state with fetched calls data
        }
      } catch (error) {
        console.error('Error in fetchCalls useEffect:', error);
        // Handle error state or feedback to user
      }
    };

    useEffect(() => {
      fetchsmsList(); 
      fetchsmsTemplates();
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
  
    const onSubmit: SubmitHandler<SMSFormInputs> = async (data: SMSFormInputs) => {
      console.log(data);
      const mutationString = `
        mutation {
          createSms(
          smsData: {
            smsTemplateId: "${data?.smsTemplateId?.value}",
            createdBy: "${userId}",
            title:"${data.title}"
            body: """${data.body}"""
            leadIds: ["${params.id}"] 
            }
          ) {
            success
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
        fetchsmsList();
      }
    };
  
    return (
      <>
      <div className='flex flex-col items-center gap-3'>
        <div className='flex w-[700px] justify-between'>
          <DatePickerWithRange/>
          <Button onClick={handleOpenSideNav} className='flex gap-2 text-white bg-blue-800 hover:bg-blue-600'>
            Add Sms
          </Button>
        </div>
        <div className='flex ml-[150px] w-[1000px] flex-wrap gap-4'>
          
          {smsList ? (
            smsList.map((sms) => (
              <CardActivity 
              key={sms.id} 
              createdBy={sms.createdBy} 
              createdAt={sms.createdAt} 
              body={sms.body}  
              />
            ))
          ) : (
            <p>Loading sms...</p>
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
              <div className="w-[274px] text-black text-xl font-medium leading-[25px]">Add SMS</div>
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
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-black text-base font-medium">Title</label>
                <input
                  id="title"
                  {...register("title")}
                  type="text"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="smsTemplateId" className="text-black text-base font-medium">SMS Template ID</label>
                
                <Controller
                  control={control}
                  name="smsTemplateId"
                  render={({ field }) => (
                    <Select
                      {...field}
                      // isLoading={true}
                      isClearable={true} 
                      isSearchable={true} 
                      options={tempaltes}
                      className="w-full border-gray-300 rounded"
                    />
                  )}
                />
              
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
                  Add SMS
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
    )
  }



