import React from 'react'
// import MainLeads from './mainLeads';

import { Email,fetchEmails } from './utils/fetchemails';
import MainEmails from './_components/MainEmails';


export async function fetchEmailsfunction(id:string): Promise<Email[] | null> {
  const { data, error } = await fetchEmails({ id });
    if (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
    console.log(data)
    return data;
  }
 
export default async function Compaigns({
  params,
}:{
  params:{
    id:string
  }
  
}) {
  const data = await fetchEmailsfunction(params.id);
  return (
    <MainEmails data={data} params={params}/>
  )
}
