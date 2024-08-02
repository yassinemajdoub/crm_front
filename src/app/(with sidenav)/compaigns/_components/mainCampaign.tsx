'use client'

import React, { useEffect, useState } from 'react';
import { columns } from '../table/columns';
import { TableDataCompaings } from '../table/tableDataCompaings';
import { Campaign } from '../utils/fetchCompaigns';


interface mainCampaignProps {
  data: Campaign[] | null; 
}

export default function MainCampaign({data}:mainCampaignProps){
  return (
      <div className='relative w-[1300px] m-8'>
            <TableDataCompaings columns={columns} data={data} />
      </div>
  )
}