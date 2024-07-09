import { Lead } from '@/sotres/leadsStore';
import React from 'react'
import { ContactsTable } from '../_components/contactsTable/dataTableContacts';
import { Contactscolumns } from '../_components/contactsTable/columnsContact';

interface ContactsLeadNewProps {
    data: Lead | null;
    params:{
        id:string
      } 
  }
export default function ContactsComponent({ data,params }:ContactsLeadNewProps){
  return (
    <div className='relative w-[1300px] m-8'>
    <ContactsTable columns={Contactscolumns} data={data?.contacts} params={params} />
  </div>
  )
}
