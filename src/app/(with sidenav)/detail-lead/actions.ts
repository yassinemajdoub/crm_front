'use server'

import { fetchMeetingsByLeadId, Meeting } from "./utils/fetchActivites";

export async function getMeetingByleadId(stringid:string): Promise<Meeting[]| null> {
    const id = (stringid);
    const { data, error } = await fetchMeetingsByLeadId({id});
    if (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
    return data;
  }