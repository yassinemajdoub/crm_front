'use client'
import React,{useCallback} from 'react'
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ViewsButtons = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
   
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
   
        return params.toString()
      },
      [searchParams]
    )
    const view = searchParams.get('view')
    const isOverview = view === 'overview';
    const isTimeline = view === 'timeline';

  return (
        <div className='flex justify-between items-center w-[230px] h-[50px] rounded-full bg-blue-100 p-2 px-3'>
            <Button className={`w-[98px] h-[32px] rounded-full bg-white text-black ${isOverview ? 'bg-blue-800 text-white' : ''} hover:bg-blue-900 hover:text-white`}
            onClick={() => {
                // <pathname>?sort=asc
                router.push(pathname + '?' + createQueryString('view', 'overview'))
            }}>
                Overview
            </Button>
            <Button className={`w-[98px] h-[32px] rounded-full bg-white text-black ${isTimeline ? 'bg-blue-800 text-white' : ''} hover:bg-blue-900 hover:text-white`}
            onClick={() => {
                // <pathname>?sort=asc
                router.push(pathname + '?' + createQueryString('view', 'timeline'))
            }}>
                Timeline
            </Button>
        </div>
  )
}

export default ViewsButtons