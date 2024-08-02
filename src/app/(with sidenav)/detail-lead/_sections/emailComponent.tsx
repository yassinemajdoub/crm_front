import React, { useEffect, useState } from 'react'
import { CiMail } from "react-icons/ci";
import { Email, fetchEmailsByid } from '../utils/fetchActivites';
import { useEmailStore } from '@/stores/emailDetailLeadStore';
import { ScrollArea } from '../_components/ScrollAreaNewYork';


interface emailLeadNewProps {
    params:{
        id:string
      } 
  }

export default function EmailComponent({ params }:emailLeadNewProps){

  const { emails, setEmails,setSelectedEmail,selectedEmail ,setError } = useEmailStore();

  useEffect(() => {
    async function fetchEmails() {
      const { data, error } = await fetchEmailsByid({ id: params.id });
      if (error) {
        setError(error);
      } else {
        setEmails(data);
        if (data && data.length > 0) {
          setSelectedEmail(data[0]);
        }
      }
    }

    fetchEmails();
  }, [params.id, setEmails, setError, setSelectedEmail]);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    console.log('Selected Email:', email); // Logging the selected email
  };

  return (
    <div className='flex p-3 rounded-xl h-[1000px] border border-zinc-300 gap-3'>
      <ScrollArea >
        <div className='flex w-[600px] h-full flex-col gap-6'>
      {emails ? emails.map((email) => (
      <button key={email.id} onClick={() => handleEmailClick(email)} className={`flex flex-col gap-4 w-[400px] text-left h-[180px] p-4 bg-white rounded-[10px] border shadow relative ${
        selectedEmail?.id === email.id ? 'border-blue-500' : ''
      }`}>
          <div key={email.id} className='flex w-full justify-between h-14 gap-3 pt-3 '>
            <div className='flex'>
              <CiMail className='h-full w-[70px]'/>
              <div>
                <p className="text-zinc-800 text-sm font-medium">{email.subject}</p>
                <p className="text-gray-500 text-sm font-normal">{email.createdBy.email}</p>
              </div>
            </div>
            <div className="flex pt-2 text-black text-sm font-normal font-['Inter']">
                {email.createdAt}
            </div>
            <div className="absolute right-0 w-1 h-5 justify-end bg-rose-500" />
          </div>
      <div className="w-[280px] pl-5 text-gray-500 text-sm font-normal font-['Poppins'] leading-[18px]">
          {email.initialBody}
      </div>
    </button>
      )) : (
          <div>Loading...</div>
        )}
    </div>
    </ScrollArea>

      <div className="flex flex-col p-4 w-full h-[920px] bg-white rounded-[10px] border border-stone-300" >
        <div className='flex items-center p-5 gap-4 w-[240px] h-[100px] '>
              <CiMail className='h-full w-[70px]'/>
              <div className='flex flex-col'>
                <div className="text-black text-base font-bold font-['Inter']">{selectedEmail?.subject}</div>
                <div className="text-black text-sm font-normal font-['Inter']">{selectedEmail?.createdBy.email}</div>
              </div>
        </div>
        <div  dangerouslySetInnerHTML={{ __html: selectedEmail?.body }} className=" p-5 text-black/opacity-60 text-[15px] font-normal font-['Inter'] leading-normal"/>
      </div>
    </div>
  )
}

