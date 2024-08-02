'use client'

import React, { useEffect, useState } from 'react';
import { columns } from '../table/columns';
import { Query } from '../utils';
import { TableDataQueries } from '../table/tableDataTasks';


interface mainCampaignProps {
  data: Query[] | null; 
}

export default function MainTaskDetail({data}:mainCampaignProps){
  return (
      <div className='relative w-[1300px] m-8'>
            <TableDataQueries columns={columns} data={data} />
      </div>
  )
}