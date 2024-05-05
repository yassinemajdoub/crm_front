import LogoWhite from '@/components/svg/LogoWhite'
import React from 'react'


const Loginleft = () => {
  return (
    <section className='col-span-2 w-full h-full bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 relative'>
    <div className='absolute top-[60%] left-[35%] transform -translate-x-1/2 -translate-y-1/2'>
        <div className='h-[300px] w-[500px] flex flex-col gap-5 '>
            <div className='h-[100px] w-[220px] flex flex-col justify-center items-center'>
                <LogoWhite/>
                <div className='flex flex-row w-[140px] items-end'>
                    <div className="w-[24.35px] h-[14.61px] border-t border-white" />
                    <div className="w-[84.41px] h-[38.96px] text-center text-white text-2xl font-normal font-['Poppins']">CRM</div>
                    <div className="w-[24.35px] h-[14.61px] border-t border-white" />
                </div>
            </div>
            <div>
                <p className="text-left text-white text-2xl font-bold font-['Poppins'] uppercase tracking-wide">Your business</p>
                <p className="text-left text-white text-[40px] font-bold font-['Poppins'] uppercase tracking-wide">Always in the go</p>
            </div>
        </div>
    </div>
        <div className="w-[638px] h-[583px] left-[-150px] top-[620px] absolute overflow-hidden">
            <div className="w-[557px] h-[557px] left-[81px] top-[26px] absolute rounded-full border border-sky-600" />
            <div className="w-[557px] h-[557px] left-0 top-0 absolute rounded-full border border-sky-600" />
        </div>
  </section>
  )
}

export default Loginleft