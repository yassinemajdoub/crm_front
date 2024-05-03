'use client'

import React, { useEffect,useCallback } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import { useStepStore } from "../../page";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const Stepper = () => {
  const steps = [
    { value: 'Personal Information', slug: 'personal_information' },
    { value: 'Segment', slug: 'segment' },
    { value: 'Contacts', slug: 'contacts' },
  ];
  
  const currentStep = useStepStore((state) => state.currentStep); // Access current step from store
  const complete = useStepStore((state) => state.complete); // Access complete state from store
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  
  useEffect(() => {
    const currentStepSlug=steps[currentStep - 1].slug
    router.push(pathname+'?'+createQueryString('step',currentStepSlug)); 
  }, [currentStep, router]);

  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500 whitespace-nowrap">{step.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;