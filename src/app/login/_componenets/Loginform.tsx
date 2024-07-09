'use client'

import React ,{useRef,useState,useEffect} from 'react'
import { Input } from '@/components/ui/input'
import { SignIn } from '../actions'
import { toast } from "sonner";
import SubmitButton from './ButtonLogin';
import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// const token = Cookies.get('token');

const Loginform = () => {
    const ref = useRef<HTMLFormElement>(null)
    const router=useRouter()

  return (
    <>
    <form
            ref={ref}
            action={async (formData) => {
                console.log("Form action called");
                ref.current?.reset();
                const { error } = await SignIn(formData);
                if (error) {
                toast.info("An error occurred: " + error);
                } else {
                toast.success("Login successful!");
                router.push("/deals")
                }
            }}
            
         className='col-span-1 h-full'>
        <div className='w-[383.65px] h-[500px] flex flex-col justify-end items-start gap-7 m-6 mx-14'>
            <div className='flex flex-col gap-1'>
                <div className="text-zinc-800 text-[26px] font-bold">Hello!</div>
                <div className="text-zinc-800 text-base font-normal">Sign Up to Get Started</div>
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <p className='text-slate-700 text-sm font-medium'>Email</p>
                <Input name='email' type='email' className='w-full hover:border-blue-500' placeholder='Email Address'/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <p className='text-slate-700 text-sm font-medium'>Password</p>
                <Input name='password' type='password' className='w-full hover:border-blue-500' placeholder='Password'/>
            </div>
            <SubmitButton label='Login' loading="loading..." className='w-full bg-blue-800 hover:bg-blue-500'/>

        </div>
  </form>
  </>
  )
}

export default Loginform