'use client'

import React, { useEffect, useState } from 'react';
import { columns } from './columns';
import { DataTableShadcn } from './data-table'
import { Lead, useLeadsStore } from '@/stores/leadsStore'


interface MainLeadsProps {
  data: Lead[]; 
}

export default function MainLeads({data}:MainLeadsProps){
  return (
      <div className='relative w-[1300px] m-8'>
          <DataTableShadcn columns={columns} data={data} />
      </div>
  )
}