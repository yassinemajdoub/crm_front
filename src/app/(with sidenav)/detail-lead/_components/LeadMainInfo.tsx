import Facebook from "@/components/svg/facebook";
import Linkden from "@/components/svg/linkden";
import Twitter from "@/components/svg/twitter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";

const LeadMainInfo = () => {
  return (
    <div className="flex justify-centerw-[1100px] h-[239px] relative bg-white rounded-[10px] shadow border-2 border-gray-200 m-5">
      <div className="w-full h-[239px] border-box flex flex-row gap-2 p-5">
        <div className="h-full flex flex-col items-center justify-center gap-5 m-2 pb-2">
          
          <Avatar className="w-[129px] h-[129px] shadow border border-slate-50" >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Button variant="default" className="w-full text-center text-white font-semibold bg-blue-900">
            Edit
          </Button>

        </div>
        <div className="flex flex-col justify-around h-full w-full p-3 rounded-[5px] shadow border border-black/opacity-20">
          <div className="flex flex-col">
            <div className="text-stone-900 text-sm font-bold font-['Poppins']">Lead Name</div>
            <div className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">Sid</div>
          </div>
          <div className="flex flex-col">
            <div className="text-stone-900 text-sm font-bold font-['Poppins']">Email</div>
            <div className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">siddxd@growthx.com</div>
          </div>
          <div className="flex flex-col">
            <div className="text-stone-900 text-sm font-bold font-['Poppins']">Phone Number</div>
            <div className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">+91 49652845732</div>
          </div>
        </div>
  
      
      <div className="flex flex-col h-full w-full rounded-[5px] p-3 shadow border border-black/opacity-20 justify-start items-start gap-[11px]">
        <div className="text-black text-base font-bold font-['Poppins']">About Company</div>
        <div className="w-full text-zinc-700/opacity-80 text-xs font-normal font-['Poppins'] tracking-tight">Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur.</div>
      </div>

      
        <div className="flex flex-col gap-[18px] w-full h-full px-4 pt-4 rounded-[5px] shadow border border-black/opacity-20 ">
          
          <p className="text-neutral-800/opacity-90 text-base font-medium font-['Poppins']">Social media Accounts</p>
          <div className="flex flex-col justify-evenly gap-3">
             <div className="flex flex-row gap-3">
              <Facebook />
              <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">siddxd@growthx.com </p>
              </div>
              <div className="flex flex-row gap-3">
              <Linkden />
              <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">siddxd@growthx.com </p>
              </div>
              <div className="flex flex-row gap-3">
              <Twitter />
              <p className="text-neutral-800/opacity-90 text-xs font-medium font-['Poppins']">siddxd@growthx.com </p>
              </div>
          </div>
        </div>

        <Button variant="default" className="w-[67px] h-10 text-center text-white font-semibold bg-blue-900">
          Edit
        </Button>
      </div>
    </div>
  
  );
};


export default LeadMainInfo;
