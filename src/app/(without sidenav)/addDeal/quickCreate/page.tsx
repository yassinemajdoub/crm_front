"use client"

import { useForm } from "react-hook-form";
import { Info, Image, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "../_components/Header";
import Nav from "../_components/Nav";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
        toast.success("Form submitted", {})
    }
    useEffect(() => {
        if (errors["company"] || errors["lastName"]) {
            toast.error("Form was not submitted", {})
        }
    }, [errors])

    const labelClassName = "text-[#3D475C]/90 font-medium text-[16px] flex items-center my-[8px]";
    const inputClassName = "border border-black/20 rounded-[6px] px-[12px] h-[50px]";

    //TODO Finish the image field and the validation

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Header />
            <Nav current="quickCreate" />
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
            <section className="flex px-[200px]  min-h-[60vh] h-[720px] mt-[50px]">
                <div className="w-[60%] h-full">

                    <label className={labelClassName} htmlFor="company">Company <span className="text-[#1D1DCE] translate-x-[2px] text-[20px]">*</span><Info className="scale-75" /></label>
                    <input type="text" className={cn(inputClassName, "w-full ", { "border-red-500 border-2 ": errors["company"] })} {...register("company", { required: true })} />
                    <span className={cn("opacity-0", { "text-red-500 text-[14px] font-medium opacity-100": errors["company"]?.type == "required" })}>this field is required</span>

                    <label className={labelClassName} htmlFor="firstName">First Name<Info className="scale-75" /></label>
                    <input type="text" className={cn(inputClassName, "w-full")} {...register("firstName")} />

                    <div className="flex gap-[40px] mt-[10px]">

                        <div className="w-1/2">
                            <label className={labelClassName} htmlFor="lastName">Last Name<Info className="scale-75" /></label>
                            <input type="text" className={cn(inputClassName, "w-full ", { "border-red-500 border-2 ": errors["lastName"] })} {...register("lastName", { required: true })} />
                            <span className={cn("opacity-0", { "text-red-500 text-[14px] font-medium opacity-100": errors["lastName"]?.type == "required" })}>this field is required</span>

                        </div>
                        <div className="w-1/2 ">
                            <label className={labelClassName} htmlFor="phone">Phone<Info className="scale-75" /></label>
                            <input type="text" className={cn(inputClassName, "w-full")} {...register("phone")} />

                        </div>
                    </div>
                    <label className={cn(labelClassName, "mt-0")} htmlFor="email">Email<Info className="scale-75" /></label>
                    <input type="text" className={cn(inputClassName, "w-full")} {...register("email")} />


                    <label className={labelClassName} htmlFor="notes">Notes <Info className="scale-75" /></label>
                    <textarea className="min-w-full border border-black/20 p-[8px] h-[250px] rounded-[12px]" id="" cols={30} rows={5} {...register("notes")}></textarea>
                </div>

                <div className="w-[35%] h-full flex-col min-h-[1] bg-[#1D1DCE]/10 relative ml-[40px] rounded-[16px] ">
                    <input type="file" value="" className="border border-red-700 absolute h-full w-full opacity-0 z-50 hover:cursor-pointer" />
                    <ImageIcon className="w-[150px] h-[150px] stroke-[1] stroke-neutral-700 absolute top-1/4 left-1/2 -translate-x-1/2" />
                    <div className="flex flex-col gap-[14px] mt-[60px] text-black/50 absolute w-full top-[55%] text-center -translate-y-1/2 ">


                        <span className="text-[28px] font-medium "> Drag & Drop</span>
                        <span className="text-[16px]">OR</span>
                        <span className="text-[#1D1DCE]">Browse Photo</span>
                        <span className="text-[16px]">Supports: *.png, *.jpg and *.jpeg</span>
                    </div>
                </div>
            </section>
        </form>
    )
}