import React from 'react'
import { Lead } from '@/sotres/leadsStore';


interface emailLeadNewProps {
    data: Lead | null;
    params:{
        id:string
      } 
  }
export default function EmailComponent({ data,params }:emailLeadNewProps){
  return (
    <div>mail</div>
  )
}

