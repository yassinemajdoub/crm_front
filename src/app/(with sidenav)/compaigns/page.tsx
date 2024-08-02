import React from 'react'
// import MainLeads from './mainLeads';

import { fetchCampaigns,Campaign } from './utils/fetchCompaigns';
import MainCampaign from './_components/mainCampaign';

export async function fetchCampaignsfunction(): Promise<Campaign[] | null> {
    const { data, error } = await fetchCampaigns();
    if (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
    return data;
  }
 
export default async function Compaigns() {
  const data = await fetchCampaignsfunction();
  return (
    <MainCampaign data={data} />
  )
}
