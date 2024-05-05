import React from 'react';
import { UseFormRegister,Control } from 'react-hook-form'; 
import CategoriesSelect from './FancyMultiSelect';
import MultipleSelectorCreatable from './MultipleSelectorCreatable';
import { FormFields } from './formLead';

interface FormProps {
  register: UseFormRegister<any>;
  control:Control<FormFields>
}



const PersonalInformationForm: React.FC<FormProps> = ({ register ,control}) => {
    const labelClassName = 'text-[#3D475C]/90 font-medium text-[16px] flex items-center my-[8px]';
    const inputClassName = 'w-full border border-black/20 rounded-[6px] px-[12px] h-[50px]';
  
    return (
      <section className="mt-[40px] px-[90px]">
        <h2 className="text-[22px] text-[#84818A]/90 font-medium">Lead Information</h2>
        <div className="grid gap-[40px] grid-cols-2">
          <div className="flex flex-col gap-1 mt-[6px]">
            <label className={labelClassName} htmlFor="leadOwner">
              Lead Owner
            </label>
            <input type="text" className={inputClassName} {...register('leadOwner')} />
  
            <label className={labelClassName} htmlFor="firstName">
              First Name
            </label>
            <input type="text" className={inputClassName} {...register('firstName')} />


          </div>
  
          <div className="flex flex-col gap-1 mt-[6px]">
            <div>
                <label className={labelClassName} htmlFor="lastName">
                Last Name
                </label>
                <input type="text" className={inputClassName} {...register('lastName')} />
            </div>
            <label className={labelClassName} htmlFor="frameworks">
              Niches
            </label>
            {/* Add FancyMultiSelect with frameworks */}
            
            <MultipleSelectorCreatable control={control} className="text-[16px] rounded-[6px] font-medium h-[50px]"/>
          </div>

        </div>
      </section>
    );
  };
  
  export default PersonalInformationForm;