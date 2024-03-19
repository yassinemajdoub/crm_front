"use client"

import { useForm } from "react-hook-form";
import { Info } from "lucide-react";
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Header />
            <Nav current="create" />
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
            {/** lead information */}
            <section className="mt-[40px] px-[90px]">
                <h2 className="text-[22px] text-[#84818A]/90 font-medium">Lead Information</h2>

                <div className="grid gap-[40px] grid-cols-2">
                    {/**left items */}
                    <div className="flex flex-col mt-[6px]">
                        <label className={labelClassName} htmlFor="leadOwner">Lead Owner<Info className="scale-75" /></label>
                        <input className={inputClassName} {...register("leadOwner")} />

                        <label className={labelClassName} htmlFor="firstName">First Name<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("firstName")} />
                        <label className={labelClassName} htmlFor="title">Title<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("title")} />

                        <label className={labelClassName} htmlFor="phone">Phone<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("phone")} />

                        <label className={labelClassName} htmlFor="mobile">Mobile<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("mobile")} />

                        <label className={labelClassName} htmlFor="leadSource">Lead Source<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("leadSource")} />

                        <label className={labelClassName} htmlFor="industry">Industry<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("industry")} />

                        <label className={labelClassName} htmlFor="annualRevenue">Annual Revenue<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("annualRevenue")} />

                    </div>

                    {/**right items */}
                    <div className="flex flex-col">

                        <label className={labelClassName} htmlFor="company">Company <span className="text-[#1D1DCE] translate-x-[2px] text-[20px]">*</span><Info className="scale-75" /></label>
                        <input type="text" className={cn(inputClassName, "w-full ", { "border-red-500 border-2 ": errors["company"] })} {...register("company", { required: true })} />
                        <span className={cn("opacity-0", { "text-red-500 text-[14px] font-medium opacity-100": errors["company"]?.type == "required" })}>this field is required</span>

                        <label className={labelClassName} htmlFor="lastName">Last Name <span className="text-[#1D1DCE] translate-x-[2px] text-[20px]">*</span><Info className="scale-75" /></label>
                        <input type="text" className={cn(inputClassName, "w-full")} {...register("lastName", { required: true })} />
                        <span className={cn("opacity-0", { "text-red-500 text-[14px] font-medium opacity-100": errors["lastName"]?.type == "required" })}>this field is required</span>


                        <label className={labelClassName} htmlFor="email">Email<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("email")} />

                        <label className={labelClassName} htmlFor="secondaryEmail">Secondary Email<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("secondaryEmail")} />

                        <label className={labelClassName} htmlFor="fax">Fax<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("fax")} />

                        <label className={labelClassName} htmlFor="website">Website<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("website")} />

                        <label className={labelClassName} htmlFor="leadStatus">Lead Status<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("leadStatus")} />

                        <label className={labelClassName} htmlFor="numberOfEmployees">Number Of Employees<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("numberOfEmployees")} />

                        <label className={labelClassName} htmlFor="rating">Rating<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("rating")} />

                    </div>

                </div>

            </section>

            {/** address information  */}
            <section className="px-[90px]">
                <h2 className="text-[22px] text-[#84818A]/90 font-medium">Address Information</h2>
                <div className="grid grid-cols-2 gap-[40px]">
                    <div className="flex flex-col">
                        <label className={labelClassName} htmlFor="street">Street<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("street")} />

                        <label className={labelClassName} htmlFor="state">State<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("state")} />

                        <label className={labelClassName} htmlFor="country">Country<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("country")} />

                    </div>

                    <div className="flex flex-col">

                        <label className={labelClassName} htmlFor="city">City<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("city")} />

                        <label className={labelClassName} htmlFor="zipCode">Zip Code<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("zipCode")} />

                    </div>

                </div>
            </section>

            {/** description information */}
            <section className="mt-[40px] px-[90px] pb-[40px]">
                <h2 className="text-[22px] text-[#84818A]/90 font-medium">Description Information</h2>
                <label className={labelClassName} htmlFor="notes">Notes <Info className="scale-75" /></label>
                <textarea className="min-w-full border border-black/20 p-[8px] min-h-[200px] rounded-[12px]" id="" cols={30} rows={20} {...register("notes")}></textarea>
            </section>

        </form>
    );
}