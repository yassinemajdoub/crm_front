import LogoWhite from '@/components/svg/LogoWhite'
import React  from 'react'
import Loginleft from './_componenets/login-left'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const page = () => {
  return (
    <div className='grid grid-cols-3 h-[900px]'>
        <Loginleft />
      <section className='col-span-1 h-full'>
        <div className='w-[383.65px] h-[500px] flex flex-col justify-end items-start gap-7 m-6 mx-14'>
            <div className='flex flex-col gap-1'>
                <div className="text-zinc-800 text-[26px] font-bold">Hello!</div>
                <div className="text-zinc-800 text-base font-normal">Sign Up to Get Started</div>
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <p className='text-slate-700 text-sm font-medium'>Email</p>
                <Input className='w-full hover:border-blue-500' placeholder='Email Address'/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <p className='text-slate-700 text-sm font-medium'>Password</p>
                <Input className='w-full hover:border-blue-500' placeholder='Password'/>
            </div>
            <Button className='w-full bg-blue-800 hover:bg-blue-500'>
                Login
            </Button>

        </div>
      </section>
      
    </div>

  )
}

export default page