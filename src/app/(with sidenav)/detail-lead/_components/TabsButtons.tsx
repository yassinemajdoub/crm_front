'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { FiAlignJustify } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoMdContacts } from "react-icons/io";

const TabsButtons = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
   
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
   
        return params.toString()
      },
      [searchParams]
    )

    const tab=searchParams.get('tab')
    const view = searchParams.get('view')
    const isTimeline = view === 'timeline';
    
    const isInformations = tab === 'Informations';
    const isEmails = tab === 'Emails';
    const isActivities = tab === 'Activities';
    const isContacts = tab === 'Contacts';
    
    if (isTimeline) {
        return null;
      }
  return (
            <div className='flex gap-2 items-end w-[700px] h-[80px] self-end mx-7'>
                <div className={`flex justify-evenly items-center w-full h-[50px] p-6 rounded-sm ${isInformations ? 'bg-blue-100' : 'bg-gray-200'} hover:bg-blue-100 hover:h-[57px]`}
                onClick={() => {
                    // <pathname>?sort=asc
                    router.push(pathname + '?' + createQueryString('tab', 'Informations'))
                }}>
                    <IoMdInformationCircleOutline size={22} />
                    <p className='font-semibold'>Informations</p>
                </div>
                <div className={`flex justify-evenly items-center w-full h-[50px] p-6 rounded-sm ${isEmails ? 'bg-blue-100' : 'bg-gray-200'} hover:bg-blue-100 hover:h-[57px]`}
                onClick={() => {
                    // <pathname>?sort=asc
                    router.push(pathname + '?' + createQueryString('tab', 'Emails'))
                }}>
                    <HiOutlineMail size={22} />
                    <p className='font-semibold'>Emails</p>
                </div>
                <div className={`flex justify-evenly items-center w-full h-[50px] p-6 rounded-sm ${isActivities ? 'bg-blue-100' : 'bg-gray-200'} hover:bg-blue-100 hover:h-[57px]`}
                onClick={() => {
                    // <pathname>?sort=asc
                    router.push(pathname + '?' + createQueryString('tab', 'Activities'))
                }}>
                    <FiAlignJustify size={22} />
                    <p className='font-semibold'>Activities</p>
                </div>

                <div className={`flex justify-evenly items-center w-full h-[50px] p-6 rounded-sm ${isContacts ? 'bg-blue-100' : 'bg-gray-200'} hover:bg-blue-100 hover:h-[57px]`}
                onClick={() => {
                    // <pathname>?sort=asc
                    router.push(pathname + '?' + createQueryString('tab', 'Contacts'))
                }}>
                    <IoMdContacts size={22} />
                    <p className='font-semibold'>Contacts</p>
                </div>

            </div>
  )
}

export default TabsButtons