import React from 'react';

import { UseFormRegister } from 'react-hook-form'; // Import the type for `register`

interface FormProps {
  register: UseFormRegister<any>; // Adjust to your specific form structure
}
// Assuming yo

const SegmentForm: React.FC<FormProps> = ({ register }) => {
    const labelClassName = 'text-[#3D475C]/90 font-medium text-[16px] flex items-center my-[8px]';
    const inputClassName = 'border border-black/20 rounded-[6px] px-[12px] h-[50px]';
  
    return (
      <section className="mt-[40px] px-[90px]">
        <h2 className="text-[22px] text-[#84818A]/90 font-medium">Segment</h2>
        <div className="grid gap-[40px] grid-cols-2">
          <div className="flex flex-col mt-[6px]">
            <label className={labelClassName} htmlFor="segmentName">
              Segment Name
            </label>
            <input type="text" className={inputClassName} {...register('segmentName')} />
          </div>
  
          <div className="flex flex-col mt-[6px]">
            <label className={labelClassName} htmlFor="segmentDescription">
              Segment Description
            </label>
            <input type="text" className={inputClassName} {...register('segmentDescription')} />
          </div>
        </div>
      </section>
    );
  };
  
  export default SegmentForm;
