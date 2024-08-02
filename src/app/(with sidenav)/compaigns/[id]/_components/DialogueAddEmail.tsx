'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Select from 'react-select';
import { Plus } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { fetchBusinessSectors, fetchNiches, fetchTags } from "@/app/(with sidenav)/(removed)/leads/utils/fetchLeads"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "./DatePicker"
import { format } from "date-fns";
import { getCookie } from "cookies-next";
import { makeAxiosGqlRequest } from "@/lib/axios"
import { toast } from "sonner"
type Option = {
    value: string | number;
    label: string;
}

type DialogDemoProps = {
    nicheOptions: Option[];
    tagOptions: Option[];
    businessSectorOptions: Option[];
    leadOptions: Option[];
    templateOptions: Option[];
    params:{
        id:string
      }
}

export function DialogDemo({ nicheOptions, tagOptions, businessSectorOptions,leadOptions,templateOptions,params}:DialogDemoProps) {
    const { register, handleSubmit, reset,control } = useForm();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const userId = getCookie("id");


    const onSubmit = async (data) => {
        console.log("data",data);
        console.log("Selected Date:", selectedDate ? format(selectedDate, "yyyy-MM-dd") : "No date selected");
        
  // Initialize an array to collect fields for the mutation
  let mutationFields = [];

  // Add fields to the mutationFields array only if they are provided in the form data
  if (data.subject) {
    mutationFields.push(`subject: "${data.subject}"`);
  }
  if (data.template_id?.value) {
    mutationFields.push(`templateId: "${data.template_id.value}"`);
  }
  if (data.lead_ids?.length > 0) {
    mutationFields.push(`leadIds: ${JSON.stringify(data.lead_ids.map((lead) => lead.value))}`);
  }
  if (data.niche_ids?.length > 0) {
    mutationFields.push(`nicheIds: ${JSON.stringify(data.niche_ids.map((niche) => niche.value))}`);
  }
  if (data.business_sector_ids?.length > 0) {
    mutationFields.push(`businessSectorIds: ${JSON.stringify(data.business_sector_ids.map((sector) => sector.value))}`);
  }
  if (data.tags_ids?.length > 0) {
    mutationFields.push(`tagsIds: ${JSON.stringify(data.tags_ids.map((tag) => tag.value))}`);
  }
  if (selectedDate) {
    mutationFields.push(`scheduleDate: "${format(selectedDate, "yyyy-MM-dd")}"`);
  }
  if (userId) {
    mutationFields.push(`owner: "${userId}"`);
  }

  // Construct the mutation string with dynamically added fields
  const mutationString = `
    mutation {
      createEmail(
        ${mutationFields.join(",\n        ")}
      ) {
        email {
          id
          subject
          body
          emailType
          isSent
          scheduleDate
          leads {
            id
            name
          }
        }
      }
    }
  `;
        
            console.log("Mutation String:", mutationString);
        
            console.log(mutationString);
  
            const response = await makeAxiosGqlRequest(mutationString);
            console.log(response);
            const { error } = response;
            if (error) {
              toast.error(error.message);
            } else {
              toast.success("email added successfully");
            }
    }
    
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="justify-center text-white px-2 h-[50px] rounded-lg flex items-center font-semibold text-[18px] dark:text-white/80  hover:bg-blue-800 bg-[#1D1DCE] border  py-0">
              <Plus className="p-[1px] stroke-[2] mr-[8px]" />
              <span className="text-white text-sm font-semibold">Add Email</span>
            </Button>
          </DialogTrigger>
    
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create Email</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new email
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="subject" className="w-1/4 text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  {...register("subject", { required: true })}
                  className="flex-grow"
                />
              </div>
              {/* <div className="flex items-center gap-4">
                <Label htmlFor="Body" className="w-1/4 text-right">
                  Body
                </Label>
                <Textarea
                  id="Body"
                  {...register("Body", { required: true })}
                  className="flex-grow"
                />
              </div> */}
              <div className="flex items-center gap-4">
                <Label htmlFor="template_id" className="w-1/4 text-right">
                  Template ID
                </Label>
                <Controller
                  name="template_id"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={templateOptions}
                      className="flex-grow"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="lead_ids" className="w-1/4 text-right">
                  Lead IDs
                </Label>
                <Controller
                  name="lead_ids"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={leadOptions}
                      isMulti
                      className="flex-grow"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="niche_ids" className="w-1/4 text-right">
                  Niche IDs
                </Label>
                <Controller
                  name="niche_ids"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={nicheOptions}
                      isMulti
                      className="flex-grow"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="business_sector_ids" className="w-1/4 text-right">
                  Business Sectors
                </Label>
                <Controller
                  name="business_sector_ids"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={businessSectorOptions}
                      isMulti
                      className="flex-grow"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="tags_ids" className="w-1/4 text-right">
                  Tags
                </Label>
                <Controller
                  name="tags_ids"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={tagOptions}
                      isMulti
                      className="flex-grow"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                    <Label className="w-1/4 text-right">Schedule Date</Label>
                    <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
                </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-800 hover:bg-blue-600">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )
    }