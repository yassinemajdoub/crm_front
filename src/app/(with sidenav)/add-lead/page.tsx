'use client'

import React from 'react'
import { useState } from "react";
import AddDealHead from './_components/addLeadHead'
import FormLead from './_components/formLead'
import { Suspense } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type for the step store
type StepStore = {
  currentStep: number;
  complete: boolean;
  advanceStep: () => void;
  goBackStep: () => void;
};

// Create the store
export const useStepStore = create<StepStore>()(
       (set, get) => ({
         currentStep: 1,
         complete: false,
         advanceStep: () => {
           const current = get().currentStep + 1;
           const complete=get().complete
           const newStep = Math.min(current , 3); 
           console.log(`Advancing step from ${get().currentStep} to ${newStep} ${complete}`);

           if (newStep > 3) {
            set({ complete: true }); 
          }
           set({ currentStep: newStep });
         },
         
         goBackStep: () => {
           const newStep = Math.max(get().currentStep - 1, 1);
           const complete=get().complete
           console.log(`Going back from ${get().currentStep} to ${newStep} ${complete}`);
           if (newStep < 3) {
            set({ complete: false }); 
          }

           set({ currentStep: newStep });
         },
       })
   );
   
const AddLead = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleAdvanceStep = () => {
      setCurrentStep((prev) => prev + 1);
      console.log(currentStep)
    };

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-start justify-start gap-[54px] max-w-full mq750:gap-[23px] mq1125:gap-[47px]">
            <AddDealHead />
            <FormLead />
        </div>
      </Suspense>
  )
}

export default AddLead