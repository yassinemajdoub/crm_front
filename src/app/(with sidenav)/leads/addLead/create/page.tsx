"use client"

import { useForm, Controller } from "react-hook-form";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Select from 'react-select';
import Header from "../_components/Header";
import CreatableSelect from 'react-select/creatable';
import Nav from "../_components/Nav";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState } from "react";
import { Input } from "@/components/ui/input";
import { fetchBusinessSectors,fetchTags, fetchStagesAndStatusesOptions,fetchNiches } from "../../utils/fetchLeads";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { makeAxiosGqlRequest } from "@/lib/axios";
import getSignedUrl from "@/app/actions/s3";


interface FormData {
    Name: string;
    phone: string;
    leadSource: string;
    industry: { value: string; label: string } | null; // Adjust according to your Select component's value structure
    leadStage: { value: string; label: string } | null; // Adjust according to your Select component's value structure
    niches: { value: string; label: string }[] | null; // Adjust according to your CreatableSelect component's value structure
    annualRevenue: string;
    rating: string;
    email: string;
    secondaryEmail: string;
    tags: { value: string; label: string }[] | null; // Adjust according to your CreatableSelect component's value structure
    website: string;
    leadStatus: { value: string; label: string } | null; // Adjust according to your Select component's value structure
    numberOfEmployees: string;
    picture:File
    street: string;
    state: string;
    country: string;
    city: string;
    zipCode: string;
    notes: string;
}

import { z } from 'zod';

export const UserSchema = z.object({
    Name: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(8, { message: 'Phone number must be at least 10 digits' }),
    leadSource: z.string(),
    annualRevenue: z.string(),
    website: z.string().url({ message: 'Invalid website URL' }),
    numberOfEmployees: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
    notes: z.string(),
    rating: z.string().max(5, { message: 'Rating must be between 0 and 5' }),
});


export default function Page() {
    const { register, handleSubmit, watch,control,formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
    })
    ;
    const [industryOptions, setIndustryOptions] = useState<{label: string, value: string}[]>([]);
    const [tagOptions, setTagOptions] = useState<{label: string, value: string}[]>([]);
    const [stagesOptions, setStagesOptions] = useState<{label: string, value: string}[]>([]);
    const [statusesOptions, setStatusesOptions] = useState<{label: string, value: string}[]>([]);
    const [nichesOptions, setNichesOptions] = useState<{label: string, value: string}[]>([]);
    
    const watchAllFields = watch();

    const onSubmit = async (data: FormData) => {
        
        // const formData = new FormData(e.target);
        console.log("Form data:", data);
        console.log("inside submit ",watchAllFields)

        const processedNiches = watchAllFields.niches?.map(niche => ({ name: niche.label })) || [];
        const processedTags = watchAllFields.tags?.map(tag => ({ name: tag.label })) || [];


        console.log("industry",watchAllFields.industry)
        
        // bizzare work around to upload files
        const pictureAsUnknown = watchAllFields.picture as unknown;
        // Then, assert to FileList
        const fileList = pictureAsUnknown as FileList;

        if (fileList.length === 0) {
            console.error("No file selected");
            return;
        }

        const file = fileList[0];

        const fileType = file?.type.split("/")[1]; 
        const fileName = file?.name;
        const folder = "media";

        const s3upload = await getSignedUrl(fileType, fileName, folder)
            .catch(err => {
                console.error(err);
                return null;
            });

        console.log("am here")
        if (s3upload) {
                await axios.put(s3upload.uploadUrl, file);
            } else {
                console.error("Failed to get signed URL or upload file.");
                return null;
            }

        console.log("am here")
        const specialString = "41aa0e1b17bd48489a11d9651d16a71a:crm";
        const url = `https://eu2.contabostorage.com/${specialString}/${s3upload.key}`;
  
        console.log("image url: ", url);
            let mutationString = `
                mutation {
                    createLead(leadInput: {
                        name: "${data.Name}",
                        phone: "${data.phone}",
                        email: "${data.email}",
                        tags: [${processedTags.map(tag => `{name: "${tag.name}"}`).join(', ')}],
                        website: "${data.website}",
                        status: { name: "${watchAllFields.leadStatus?.value}" },
                        stage: { name: "${watchAllFields.leadStage?.value}" },
                        businessSector: { name: "${watchAllFields.industry?.value}" },
                        address: {
                            streetAddress: "${data.street}",
                            city: "${data.city}",
                            state: "${data.state}",
                            postalCode: "${data.zipCode}",
                            country: "${data.country}"
                        },
                        photo: "${url}",      
`;

                    // Conditionally add annualRevenue and rating to the mutation string
                    if (data.annualRevenue!== "") {
                        mutationString += `annualRevenue: ${parseFloat(data.annualRevenue)},\n`;
                    }
                    if (data.rating!== "") {
                        mutationString += `rating: ${parseFloat(data.rating)},\n`;
                    }
                    if (data.numberOfEmployees!== "") {
                            `numberOfEmployees: ${parseInt(data.numberOfEmployees)}\n`
                    }

                    mutationString += `
                                niches: [${processedNiches.map(niche => `{name: "${niche.name}"}`).join(', ')}],
                                source: "${data.leadSource}",
                                description: "${data.notes}",
                            }) {
                                lead{
                                id
                                name
                                email
                                }
                            }
                        }
`;
            console.log("Mutation string:", mutationString);

            const response = await makeAxiosGqlRequest(mutationString);
            console.log(response)
            const { error } = response;
            if (error) {
                toast.error(error.message)
            }
            else {
                toast.success("Form submitted successfully")
            }
            
            toast.success("Form submitted successfully")
        };

    useEffect(() => {
        console.log("Form values changed: ", watchAllFields);
    }, [watchAllFields]);

    useEffect(() => {
        const fetchData = async () => {
            const { sectors, error: sectorsError } = await fetchBusinessSectors();
            const { tags, error: tagsError } = await fetchTags();
            const { niches, error: nichesError } = await fetchNiches();


            const { stagesOptions, statusesOptions, error } = await fetchStagesAndStatusesOptions();

            

            if (!error) {
                setStagesOptions(stagesOptions);  
                setStatusesOptions(statusesOptions);
            }

            if (!sectorsError) {

                setIndustryOptions(sectors);
            }
            if (!tagsError) {
                setTagOptions(tags);
            }
            if (!nichesError) {
                setNichesOptions(niches);
                console.log(niches)
                console.log(nichesOptions)
            }
        };
        fetchData();
    }, []);

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
                        <label className={labelClassName} htmlFor="Name">Name<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("Name")} />
                        {errors.Name && (
                            <span className="text-red-500 text-[14px] font-medium">
                                {errors.Name.message}
                            </span>
                            )}

                        <label className={labelClassName} htmlFor="phone">Phone<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("phone")} />
                        {errors.phone && (
                            <span className="text-red-500 text-[14px] font-medium">
                                {errors.phone.message}  
                            </span>
                        )}

                        <label className={labelClassName} htmlFor="leadSource">Lead Source<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("leadSource")} />
                            {errors.leadSource && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.leadSource.message} 
                                </span>
                            )}

                        <label className={labelClassName} htmlFor="industry">Industry<Info className="scale-75" /></label>
                            <Controller
                                name="industry"
                                control={control}
                                render={({ field }) => (
                                    <div className="border border-black/20 rounded-[6px] px-[12px] h-[50px]">
                                        <Select
                                            {...field}
                                            options={industryOptions}
                                            isClearable={true}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    height: '100%',
                                                    minHeight: '100%',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                }),
                                                container: (provided) => ({
                                                    ...provided,
                                                    height: '100%',
                                                }),
                                            }}
                                        />
                                    </div>
                                    
                                )}
                        />  

                        
                        <label className={labelClassName} htmlFor="leadStage">Lead Stage<Info className="scale-75" /></label>
                            <Controller
                                name="leadStage"
                                control={control}
                                render={({ field }) => (
                                    <div className="border border-black/20 rounded-[6px] px-[12px] h-[50px]">
                                        <Select
                                            {...field}
                                            options={stagesOptions}
                                            isClearable={true}
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    height: '100%',
                                                    minHeight: '100%',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                }),
                                                container: (provided) => ({
                                                    ...provided,
                                                    height: '100%',
                                                }),
                                            }}
                                        />
                                    </div>
                                )}
                            />

                            <label className={labelClassName} htmlFor="niches">Niches<Info className="scale-75" /></label>
                            <Controller
                                name="niches"
                                control={control}
                                render={({ field }) => (
                                    <div className="border border-black/20 rounded-[6px] px-[12px] h-[50px]">
                                        <CreatableSelect
                                            {...field}
                                            options={nichesOptions}
                                            isClearable={true}
                                            isMulti
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    height: '100%',
                                                    minHeight: '100%',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                }),
                                                container: (provided) => ({
                                                    ...provided,
                                                    height: '100%',
                                                }),
                                            }}
                                        />
                                    </div>
                                )}
                            />

                            <label className={labelClassName} htmlFor="annualRevenue">Annual Revenue<Info className="scale-75" /></label>
                            <input
                                type="number"
                                className={inputClassName}
                                {...register("annualRevenue")}
                            />
                            {errors.annualRevenue && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.annualRevenue.message}
                                </span>
                            )}
                    </div>


                    {/**right items */}
                    <div className="flex flex-col">

                        {/* <label className={labelClassName} htmlFor="company">Company <span className="text-[#1D1DCE] translate-x-[2px] text-[20px]">*</span><Info className="scale-75" /></label>
                        <input type="text" className={cn(inputClassName, "w-full ", { "border-red-500 border-2 ": errors["company"] })} {...register("company", { required: true })} />
                        <span className={cn("opacity-0", { "text-red-500 text-[14px] font-medium opacity-100": errors["company"]?.type == "required" })}>this field is required</span> */}


                        <label className={labelClassName} htmlFor="email">Email<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("email")} />
                        {errors.email && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.email.message} 
                                </span>
                            )}

                        <label className={labelClassName} htmlFor="picture">Picture<Info className="scale-75" /></label>
                        <div className="rounded-[6px] px-[0px] h-[50px]">
                         <Input id="picture" type="file" className="w-full h-full p-2" {...register("picture")} />
                        </div>
                            

                        <label className={labelClassName} htmlFor="secondaryEmail">Secondary Email<Info className="scale-75" /></label>
                       <input type="text" className={inputClassName} {...register("secondaryEmail")} />
                       {errors.secondaryEmail && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.secondaryEmail.message} 
                                </span>
                            )}

                       <label className={labelClassName} htmlFor="tags">Tags<Info className="scale-75" /></label>
                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <div className="border border-black/20 rounded-[6px] px-[12px] h-[50px]">
                                    <CreatableSelect
                                        {...field}
                                        options={tagOptions}
                                        isMulti
                                        isClearable={true}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                height: '100%',
                                                minHeight: '100%',
                                                border: 'none',
                                                boxShadow: 'none',
                                            }),
                                            container: (provided) => ({
                                                ...provided,
                                                height: '100%',
                                            }),
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <label className={labelClassName} htmlFor="website">Website<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("website")} />
                        {errors.website && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.website.message} 
                                </span>
                            )}

                        <label className={labelClassName} htmlFor="leadStatus">Lead Status<Info className="scale-75" /></label>
                        <Controller
                            name="leadStatus"
                            control={control}
                            render={({ field }) => (
                                <div className="border border-black/20 rounded-[6px] px-[12px] h-[50px]">
                                    <Select
                                        {...field}
                                        options={statusesOptions}
                                        isClearable={true}
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                height: '100%',
                                                minHeight: '100%',
                                                border: 'none',
                                                boxShadow: 'none',
                                            }),
                                            container: (provided) => ({
                                                ...provided,
                                                height: '100%',
                                            }),
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <label className={labelClassName} htmlFor="numberOfEmployees">Number Of Employees<Info className="scale-75" /></label>
                        <input type="number" className={inputClassName} {...register("numberOfEmployees")} />
                        {errors.numberOfEmployees && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.numberOfEmployees.message} 
                                </span>
                            )}
                        <label className={labelClassName} htmlFor="rating">Rating<Info className="scale-75" /></label>
                        <input type="number" className={inputClassName} {...register("rating")} />

                        {errors.rating && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.rating.message} 
                                </span>
                            )}
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
                        {errors.street && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.street.message} 
                                </span>
                            )}

                        <label className={labelClassName} htmlFor="state">State<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("state")} />
                        {errors.state && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.state.message} 
                                </span>
                            )}

                        <label className={labelClassName} htmlFor="country">Country<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("country")} />
                        {errors.country && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.country.message} 
                                </span>
                            )}

                    </div>

                    <div className="flex flex-col">

                        <label className={labelClassName} htmlFor="city">City<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("city")} />
                        {errors.city && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.city.message} 
                                </span>
                            )}

                        <label className={labelClassName} htmlFor="zipCode">Zip Code<Info className="scale-75" /></label>
                        <input type="text" className={inputClassName} {...register("zipCode")} />
                        {errors.zipCode && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.zipCode.message} 
                                </span>
                            )}
                        

                    </div>

                </div>
            </section>

            {/** description information */}
            <section className="mt-[40px] px-[90px] pb-[40px]">
                <h2 className="text-[22px] text-[#84818A]/90 font-medium">Description Information</h2>
                <label className={labelClassName} htmlFor="notes">Notes <Info className="scale-75" /></label>
                <textarea className="min-w-full border border-black/20 p-[8px] min-h-[200px] rounded-[12px]" id="" cols={30} rows={20} {...register("notes")}></textarea>
                {errors.notes && (
                                <span className="text-red-500 text-[14px] font-medium">
                                    {errors.notes.message} 
                                </span>
                            )}
            </section>

        </form>
    );
}