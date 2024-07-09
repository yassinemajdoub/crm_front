'use client'

import { Button } from '@/components/ui/button';
import React, {  useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoIosClose } from "react-icons/io";
import { getCookie } from "cookies-next";
import { makeAxiosGqlRequest } from '@/lib/axios';
import { toast } from "sonner";  



type NoteFormInputs = {
    title: string;
    content: string;
};

export default function Notes({
    params,
  }:{
    params:{
      id:string
    }
}) {
    console.log(params.id)
    const userid = getCookie("id");
    const [isOpen, setIsSideNavOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } ,reset } = useForm<NoteFormInputs>();
    const handleOpenSideNav = () => {
        setIsSideNavOpen(true);
    };

    const onSubmit: SubmitHandler<NoteFormInputs> = async (data: NoteFormInputs) => {
        console.log(data);
        let mutationString =`
        mutation{
            createNote(
              title: "${data.title}",
              content: """${data.content}""",
              createdById: ${userid},
              leadId: ${params.id}
            ) {
              note {
                id
                title
                content
                createdBy {
                  id
                }
              }
            }
        }
        `
        console.log(mutationString)
          
          
        const response = await makeAxiosGqlRequest(mutationString);
        console.log(response)
        const { error } = response;
        if (error) {
            toast.error(error.message)
        }
        toast.success("Form submitted successfully")
        handleCloseSideNav(); 
    };

    const handleCloseSideNav = () => {
        setIsSideNavOpen(false);
    };

    const handleReset = () => {
        reset();
    };
    return (
        <>
    <div className='flex justify-between'>
        <div className="flex w-[170.76px] h-[29.78px] justify-start items-center gap-[13px] *">
                    <div className="w-[4.76px] h-[29.78px] bg-blue-800 rounded-tr-md rounded-br-md" />
                    <div className="text-center text-blue-800 text-base font-semibold leading-tight">Notes</div>
                    
            </div>
        <Button className='flex gap-2 text-white bg-blue-800 hover:bg-blue-600'
        onClick={handleOpenSideNav}>
                Add Note
        </Button>
    </div>
        
        <div
            className={`fixed top-0 right-0 h-full w-full transition-transform ${
                isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
            }`}
        >
            <div className="absolute top-0 right-0 h-full w-[721px] shadow-lg bg-white p-28">
                <section className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <div className="w-[274px] text-black text-xl font-medium leading-[25px]">Add Note</div>
                        <button onClick={handleCloseSideNav} ><IoIosClose className='w-10 h-8'/></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-black text-base font-medium">Title</label>
                            <input
                                id="title"
                                {...register("title", { required: "Title is required" })}
                                className="p-2 border border-gray-300 rounded"
                            />
                            {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="content" className="text-black text-base font-medium">Content</label>
                            <textarea
                                id="content"
                                {...register("content", { required: "Content is required" })}
                                className="p-2 border border-gray-300 rounded h-32"
                            />
                            {errors.content && <span className="text-red-600">{errors.content.message}</span>}
                        </div>
                        <div className='flex justify-end gap-3'>
                            <Button
                                type="button"
                                className="flex w-[107px] mt-4 p-2 bg-gray-200 text-black rounded hover:bg-blue-600"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                className="flex w-[107px] mt-4 p-2 bg-blue-200 text-black rounded hover:bg-blue-600"
                            >
                                Add Note
                            </Button>
                        </div>
                    </form>
                    
                </section>
            </div>
        </div>
    </>
    );

}