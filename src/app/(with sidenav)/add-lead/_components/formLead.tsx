"use client"

import { SubmitHandler,useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import PersonalInformationForm from "./PersonaInformation";
import SegmentForm from "./segment";

import { Option } from "@/components/ui/multiple-selector";
import { useStepStore } from "../page";

export type FormFields={
  email: string
  name: string
  company:string
  lastName: string
  leadOwner: string 
  firstName:string
  test2:string
  test:string
  multiSelect: Option[];
}

export default function Page() {
    const searchParams = useSearchParams(); 
    const advanceStep = useStepStore((state) => state.advanceStep);// Get query parameters
    const goBackStep = useStepStore((state) => state.goBackStep);
    const slug = searchParams.get('step');
    const [isComplete, setIsComplete] = useState(false);
    const { register, handleSubmit, formState: { errors,isSubmitting },watch,control,getValues } = useForm<FormFields>();

    const watchedValues = watch(['leadOwner', 'firstName','test2','test']);

    const onSubmit:SubmitHandler<FormFields>= async (data)=> {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve,1000));
      toast.success("Form submitted", {});
    }
    useEffect(() => {
        console.log(watchedValues);
    }, [watchedValues]);


    useEffect(() => {
        if (errors["company"] || errors["lastName"]) {
            toast.error("Form was not submitted", {})
        }
    }, [errors])

    const labelClassName = "text-[#3D475C]/90 font-medium text-[16px] flex items-center my-[8px]";
    const inputClassName = "border border-black/20 rounded-[6px] px-[12px] h-[50px]";
    const buttonClassName = "flex justify-end items-center border border-black/20 rounded-[6px] p-4 h-[50px] mr-[78px]"

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
                transition={Slide}
                className={"text-[14px]"}
            />

             {slug === 'personal_information' && <PersonalInformationForm register={register} control={control}/>}
              {slug === 'segment' && <SegmentForm register={register} />}
              <div className="self-stretch flex justify-end items-end align-center p-4">
                  {/* <Button variant="default" disabled={isSubmitting} className={buttonClassName} >
                      {isSubmitting? "loading" : "Submit"}
                  </Button> */}
                  <div className="self-stretch flex justify-end items-end p-4">
                  <Button
                        variant="default"
                        disabled={isSubmitting}
                        type="submit" // This is the submit button
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </Button>
                {isComplete ? (
                    <Button
                        variant="default"
                        disabled={isSubmitting}
                        type="submit" // This is the submit button
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </Button>
                ) : (
                    <div className="flex flex-row gap-4"> {/* Two buttons when not complete */}
                        <Button
                            variant="default"
                            onClick={goBackStep}
                            type="button" // Not a submit button
                        >
                            Go Back
                        </Button>
                        <Button
                            variant="default"
                            onClick={advanceStep}
                            type="button" // Not a submit button
                        >
                            Next
                        </Button>
                    </div>
                )}
              </div>

              </div>
              
            </form>
        </>
    );
}   