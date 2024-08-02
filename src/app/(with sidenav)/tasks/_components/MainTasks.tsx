'use client'

import React, { useEffect, useState } from 'react';
import { columns } from '../table/columns';
import { Task } from '../utils';
import { TableDatatasks } from '../table/tableDataTasks';


interface mainCampaignProps {
  data: Task[] | null; 
}

export default function MainTasks({data}:mainCampaignProps){
  return (
      <div className='relative w-[1300px] m-8'>
            <TableDatatasks columns={columns} data={data} />
      </div>
  )
}