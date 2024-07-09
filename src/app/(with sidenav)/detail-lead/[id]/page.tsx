
import React from 'react'
import DetailLeadNew from '../_components/DetailLeadNew'
import { fetchLeadById } from '../../leads/utils/fetchLeads';
import { Lead } from '@/sotres/leadsStore'

  export async function getlead(stringid:string): Promise<Lead | null> {
  const id = Number(stringid);
  const { data, error } = await fetchLeadById({ id });
  if (error) {
    throw new Error(`Failed to fetch leads: ${error}`);
  }
  return data;
}

export default async function PageDetail(
  {
    params,
  }:{
    params:{
      id:string
    }
})
 {
  const data = await getlead(params.id);
  console.log(data?.tags)
  console.log(data?.niches)
  return (
    <>
    <DetailLeadNew data={data} params={params} />
    </>
  )
}
