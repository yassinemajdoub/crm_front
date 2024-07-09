"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/app/(with sidenav)/leads-shadcn/_components/NewyorkButton";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from "@/app/(with sidenav)/leads-shadcn/_components/NewyorkInput"
import { DataTableViewOptions } from "@/app/(with sidenav)/leads-shadcn/_components/DataTableViewoptions";

import { DataTableFacetedFilter } from "@/app/(with sidenav)/leads-shadcn/_components/DataTAbleFacetedFilter";
// import { useLeadsStore } from "@/sotres/leadsStore"

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

// import Addleads from "../../leads/_components/AddLeads"
// import SelectViewMode from "../../deals/_components/SelectViewMode"
// import FilterBy from "../../deals/_components/FilterBy"
// import { Plus, Search } from "lucide-react"
// import Link from "next/link"

import { toast } from "sonner";  
import { useState } from "react"
import { IoIosClose } from "react-icons/io";
import { makeAxiosGqlRequest } from "@/lib/axios";


interface DataTableToolbarProps<TData> {
  table: Table<TData>
  params: {
    id:string
  } 
}

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

type ContactsFormInputs = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  role: string;
};

export function DataTableToolBarContacts<TData>({
  table,
  params
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [isOpen, setIsSideNavOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } ,reset } = useForm<ContactsFormInputs>();
  const handleOpenSideNav = () => {
    setIsSideNavOpen(true);
};    

const handleCloseSideNav = () => {
  setIsSideNavOpen(false);
};

const handleReset = () => {
  reset();
};

const onSubmit: SubmitHandler<ContactsFormInputs> = async (data) => {
  console.log(data);

  let mutationString = `
    mutation {
      createContacts(
        firstName: "${data.firstName}"
        lastName: "${data.lastName}"
        gender: "${data.gender}"
        phone: "${data.phone}"
        role: "${data.role}"
        email: "${data.email}"
        leadId: "${params.id}"
      ) {
        contact {
          id
          firstName
          lastName
          gender
          phone
          role
        }
      }
    }
  `;

  console.log(mutationString);

  try {
    const response = await makeAxiosGqlRequest(mutationString);
    console.log(response);
    const { error, data } = response;
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Form submitted successfully");
      console.log(data);
      handleCloseSideNav();
    }
  } catch (error) {
    toast.error(error.message);
  }

};

  
  return (
    <>
    <div className="flex items-center justify-between p-3">
      <h1 className="text-[40px] text-[#202020]/90 font-semibold">
        Contacts
        </h1>
        
      <div className="flex flex-2 items-center space-x-2">
          <Input
          placeholder="Search..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-full lg:w-[450px] border border-[#1D1DCE]  focus-visible:border-none focus-visible:ring-[#1D1DCE]/40 font-medium pl-[40px] h-[50px]"
          />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        
      <DataTableViewOptions table={table} />
      <Button onClick={handleOpenSideNav} className="justify-center text-white px-2 h-[50px] rounded-lg flex items-center font-semibold text-[18px] dark:text-white/80  hover:bg-blue-800 bg-[#1D1DCE] border  py-0">
            {/* <Plus className="p-[1px] stroke-[2] mr-[8px]" /> */}
            <span className="text-white text-sm font-semibold" >Add Contact</span>
        </Button>
      </div>
    </div>

    <div
            className={`fixed top-0 right-0 h-full w-full transition-transform ${
                isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
            } z-50`}
        >
            <div className="absolute top-0 right-0 h-full w-[721px] shadow-lg bg-white p-28">
                <section className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <div className="w-[274px] text-black text-xl font-medium leading-[25px]">Add Contact</div>
                        <button onClick={handleCloseSideNav} ><IoIosClose className='w-10 h-8'/></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="firstName" className="text-black text-base font-medium w-[95px]">firstName</label>
                            <Input
                                id="firstName"
                                {...register("firstName", { required: "firstName is required" })}
                                className="p-2 border  border-gray-300 rounded w-full"
                            />
                            {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="lastName" className="text-black text-base font-medium w-[95px]">lastName</label>
                            <Input
                                id="lastName"
                                {...register("lastName", { required: "lastName is required" })}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.lastName && <span className="text-red-600">{errors.lastName.message}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="email" className="text-black text-base font-medium w-[95px]">email</label>
                            <Input
                                id="email"
                                {...register("email", { required: "email is required" })}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="phone" className="text-black text-base font-medium w-[95px]">phone</label>
                            <Input
                                id="phone"
                                {...register("phone", { required: "phone is required" })}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="role" className="text-black text-base font-medium w-[95px]">role</label>
                            <Input
                                id="role"
                                {...register("role", { required: "role is required" })}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                            {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                        <label className="text-black text-base font-medium w-[95px]">Gender</label>
                        <div className="flex items-center justify-center gap-2">
                          <label htmlFor="male" className="text-base">
                            <input
                              type="radio"
                              id="male"
                              value="Male"
                              {...register("gender", { required: "Gender is required" })}
                              className="mr-1"
                            />
                            Male
                          </label>
                          <label htmlFor="female" className="text-base">
                            <input
                              type="radio"
                              id="female"
                              value="Female"
                              {...register("gender", { required: "Gender is required" })}
                              className="mr-1"
                            />
                            Female
                          </label>
                        </div>
                        {errors.gender && <span className="text-red-600">{errors.gender.message}</span>}
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
                                Add Contact
                            </Button>
                        </div>
                    </form>
                    
                </section>
            </div>
        </div>
  </>
    
  )
}