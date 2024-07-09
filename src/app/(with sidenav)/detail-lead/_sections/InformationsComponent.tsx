import Dropdownarrow from '@/components/svg/Dropdownarrow';
import { Button } from '@/components/ui/button';
import { Lead } from '@/sotres/leadsStore';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StatusIndetailLead from '../_components/statusIndetailLead';
import ReusableComponent from '../_components/Kpis';
import ReusableInfoBox from '../_components/informationItems';
import Facebook from '@/components/svg/facebook';
import Linkden from '@/components/svg/linkden';
import Twitter from '@/components/svg/twitter';
import Excel from '@/components/svg/excel';
import Pdf from '@/components/svg/pdf';
import Notes from '../_components/addnote';

interface informationLeadNewProps {
    data: Lead | null;
    params:{
        id:string
      } 
  }


export default function InformationsComponent({ data,params }:informationLeadNewProps) {

    const items = [
        { value: 32, label: 'Total Campaign' },
        { value: 32, label: 'Total Campaign' },
        { value: 32, label: 'Total Campaign' },
        { value: 32, label: 'Total Campaign' },
        { value: 32, label: 'Total Campaign' },
      ];
      const itemsInfobox = [
        { label: 'Owner', value: data?.owner ?? 'N/A' },  
        { label: 'Name', value: data?.name ?? 'N/A' },
        { label: 'TInumber', value: data?.TINumber ?? 'N/A' },
        { label: 'Lead Source', value: data?.source ?? 'N/A'},
        { label: 'Email', value: data?.email ?? 'N/A' },
        { label: 'email2', value: data?.email2 ?? 'N/A' },
        { label: 'Phone Number', value: data?.phone ?? 'N/A' },
        { label: 'Address', value: 'Sid' },
        { label: 'Website URL', value: data?.website ?? 'N/A' },
        { label: 'spending_on_ads', value: data?.spending_on_ads ? 'Yes' : 'No' },
        { label: 'description', value: data?.description ?? 'N/A' },
      ];
      const itemsInfobox3 = [
        { label: 'annual_revenue', value: data?.annual_revenue ?? 'N/A' },
        { label: 'rating', value: data?.rating ?? 'N/A' },
        { label: 'business_sector', value: data?.business_sector ?? 'N/A' },
        { label: 'number_of_employes', value: data?.number_of_employes ?? 'N/A' },
        { label: 'niches', value: data?.niches.map(niche => niche).join(', ') ?? 'N/A' },
        { label: 'tags', value: data?.tags.map(niche => niche).join(', ') ?? 'N/A' },
      ];
      const itemsInfobox2 = [
        { label: 'facebook', value: data?.facebook ?? 'N/A' },
        { label: 'instagram', value: data?.instagram ?? 'N/A'},
        { label: 'linkden', value: data?.Linkden ?? 'N/A' },
        { label: 'twitter', value: 'Some Value' },
        { label: 'tiktok', value: data?.tiktok ?? 'N/A'},
      ];
      const itemsInfobox4 = [
        { label: 'Website URL', value: 'Some Value' },
        { label: 'tiktok', value: 'Sid' },
        { label: 'Address', value: 'Sid' },
        { label: 'spending_on_ads', value: 'Some Value' },

      ];
      const test = () => {
        console.log(data?.notes?.createdBy);
    };
      
    return (
        <section className='w-full h-full flex flex-col gap-3'>

            <div className='flex justify-between p-3'>
                <div className="w-[170.76px] h-[29.78px] justify-start items-center gap-[13px] inline-flex">
                        <div className="w-[4.76px] h-[29.78px] bg-blue-800 rounded-tr-md rounded-br-md" />
                        <div className="text-center text-blue-800 text-base font-semibold leading-tight">Lead informations</div>
                </div>
                <Button onClick={test} className='flex gap-2 text-white bg-blue-800 hover:bg-blue-600'>
                    Convert 
                    <Dropdownarrow />
                </Button>
            </div>
  
                <div className='flex w-full hyfull gap-9 px-3'>
                    <Avatar className="w-[129px] h-[129px] shadow border border-slate-50 " >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-center items-start w-[160px] gap-2'>
                        <p className="text-black text-base font-semibold ">Yassir Delivery</p>
                        <p className="text-neutral-400 text-sm font-normal font-['Noto Sans']">9765432180 </p>
                        <StatusIndetailLead selectedStatus={data?.status} />         
                    </div>
                    <ReusableComponent items={items} />
                </div>

            <div className="flex flex-col w-[1300px] h-[638px]">
                <div className='flex justify-start'>
                    <ReusableInfoBox items={itemsInfobox} />
                    <div className='flex flex-col justify-start'>
                        <ReusableInfoBox items={itemsInfobox3} />
                        <div className="flex flex-col gap-[18px] w-[280px] px-4 py-4 rounded-[5px] ml-8 shadow border border-black/opacity-20">
                            <p className="text-neutral-800/opacity-90 text-base font-medium font-['Poppins']">Social media Accounts</p>
                            <div className="flex flex-col justify-evenly gap-3">
                                <div className="flex flex-row gap-3">
                                <Facebook />
                                <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">{data?.facebook ?? 'N/A'} </p>
                                </div>
                                <div className="flex flex-row gap-3">
                                <Linkden />
                                <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">{data?.Linkden ?? 'N/A'} </p>
                                </div>
                                <div className="flex flex-row gap-3">
                                <Twitter />
                                <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">{data?.tiktok ?? 'N/A'} </p>
                                </div>
                                <div className="flex flex-row gap-3">
                                <Twitter />
                                <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">{data?.facebook ?? 'N/A'} </p>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            <Notes params={params} />
            <div className="w-[1300px]  border-4  p-5">
                
            <div className='flex flex-col gap-6 flex-wrap'>
                {data?.notes?.map((note) => (
                            <div key={note.id} className='flex'>
                            <div className="w-[5px] bg-blue-800 rounded-tr-md rounded-br-md"/>
                            <div className='flex flex-col gap-1 p-3 '>
                                <p className="text-stone-900 text-base font-semibold tracking-wide">{note.title}</p>
                                <p className='text-stone-900 text-sm font-medium'>{note.content}</p>
                                <p className="text-zinc-500 text-xs font-medium tracking-wide">{note.createdBy.email}</p>
                                <p className="text-zinc-500 text-xs font-medium tracking-wide">{note.createdAt}</p>
                            </div>
                            </div>
                        ))}
                </div>
                </div>
                <div className="w-[170.76px] h-[29.78px] justify-start items-center gap-[13px] inline-flex">
                        <div className="w-[4.76px] h-[29.78px] bg-blue-800 rounded-tr-md rounded-br-md" />
                        <div className="text-center text-blue-800 text-base font-semibold leading-tight">Attachments</div>
                </div>
            <div className="flex gap-3 w-[1300px]  border-4 p-3">
                <button className='flex w-[80.76px] h-[94.91px] items-center justify-center bg-blue-100'>
                    <Excel/>
                </button>
                <button className='flex w-[80.76px] h-[94.91px] items-center justify-center bg-blue-100'>
                    <Pdf/>
                </button>
            </div>
        </section>

    )
}