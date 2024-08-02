
import React from 'react'
import { fetchProspectingTasks, Task } from './utils';
import MainTasks from './_components/MainTasks';

export async function getTasks(): Promise<Task[]> {
    const { data, error } = await fetchProspectingTasks();
    
    if (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
    return data;
  }

export default async function Page() {
  const data = await getTasks();
  console.log(data)
  
  return (
    <MainTasks data={data} />

  )
}
