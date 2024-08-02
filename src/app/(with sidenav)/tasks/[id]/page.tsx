import React from 'react'
import { fetchQueries, Query, TaskDetail } from './utils';
import MainTaskDetail from './_components/MainTaskDetail';

export async function getQueries(taskId: string): Promise<TaskDetail> {
    const taskIdNumber = Number(taskId);
    if (isNaN(taskIdNumber)) {
      throw new Error(`Invalid task ID: ${taskId}`);
    }

    const { data, error } = await fetchQueries(taskIdNumber);
    console.log(data);
    if (error) {
      throw new Error(`Failed to fetch queries: ${error}`);
    }
    return data;
  }
 
export default async function Compaigns({
  params,
}:{
  params:{
    id:string
  }
  
}) {
  const data = await getQueries(params.id);
  console.log(data);
return (
    <MainTaskDetail data={data.queries} />

  )
}
