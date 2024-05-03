'use client'

import React from 'react'
import { useState } from "react";
import AddDealHead from './_components/addLeadHead'
import FormLead from './_components/formLead'

import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

// Define the type for the step store
type StepStore = {
  currentStep: number;
  complete: boolean;
  advanceStep: () => void;
  goBackStep: () => void;
};

// Create the store
export const useStepStore = create<StepStore>()(
    devtools(
        persist(
       (set, get) => ({
         currentStep: 1,
         complete: false,
         advanceStep: () => {
           const current = get().currentStep + 1;
           const complete=get().complete
           const newStep = Math.min(current , 3); 
           console.log(`Advancing step from ${get().currentStep} to ${newStep} ${complete}`);

           if (newStep > 3) {
            set({ complete: true }); // Mark as complete when advancing past the last step
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
       }),
       {
         name: 'step-storage', // Unique name for sessionStorage key
         storage: createJSONStorage(() => localStorage), // Use sessionStorage instead of localStorage
       },
    )
   )
);
   
const page = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleAdvanceStep = () => {
      setCurrentStep((prev) => prev + 1);
      console.log(currentStep)
    };

  return (
        <div className="flex flex-col items-start justify-start gap-[54px] max-w-full mq750:gap-[23px] mq1125:gap-[47px]">
            <AddDealHead />
            <FormLead />
        </div>
  )
}

export default page