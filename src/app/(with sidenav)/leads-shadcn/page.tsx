import React from 'react'
import MainLeads from './mainLeads';

import { fetchLeads } from '../leads/utils/fetchLeads';
import { Lead } from '@/sotres/leadsStore'

export async function getleads(): Promise<Lead[]> {
    const { data, error } = await fetchLeads();
    if (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
    return data;
  }

export default async function Page() {
  const data = await getleads();
  return (
    <MainLeads data={data} />
  )
}
