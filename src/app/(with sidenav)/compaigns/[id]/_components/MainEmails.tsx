'use client'

import React, { useEffect, useState } from 'react';
import { columns } from '../table/columns';
import { Email } from '../utils/fetchemails';
import { TableDataEmail } from '../table/tableDataEmail';


interface MainEmailsProps {
  data: Email[] | null; 
  params:{
    id:string
  }
}

export default function MainEmails({data,params}:MainEmailsProps){
  return (
      <div className='relative w-[1120px] m-8'>
            <TableDataEmail columns={columns} data={data} params={params} />
      </div>
  )
}