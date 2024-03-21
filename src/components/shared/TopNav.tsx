import { Search, Settings } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitcher from "./ThemeSwitcher";
import NotificationsBell from "./Notifications";
import Messages from "./Messages";
import UserButton from "./UserButton";

export default function TopNav() {
    return <header className=" h-[75px] items-center w-full flex">
        <div className="relative w-[430px] ml-[40px]">
            <Input type="text" placeholder="Search..." className="w-full  outline-[#1D1DCE]  focus-visible:ring-black/20 focus-visible:shadow-[#1D1DCE]/20 focus-visible:shadow  " />
            <Search className="absolute top-1/2 -translate-y-1/2 right-[20px] stroke-black/40" />
        </div>
        <div className="flex items-center justify-end  ml-auto gap-[30px]">
            <Settings className="stroke-black/80 scale-105 translate-y-[2px] -mr-[4px] transition-transform hover:cursor-pointer active:scale-100" />
            <ThemeSwitcher />
            <NotificationsBell />
            <Messages />
            <UserButton className="mr-[40px]" />
        </div>
    </header>
}