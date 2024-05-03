import type { NextPage } from "next";
import Stepper from "./stepper/stepper";

const AddDealHead: NextPage = () => {
  return (
    <div className="w-full flex flex-1 flex-col place-items-center justify-center py-2 px-[31px] pr-[80px] gap-4 box-border max-w-full text-left text-17xl text-black font-poppins">
        <h1 className="m-0 text-4xl leading-relaxed font-semibold text-center">
            Add Lead
            </h1>
        <div >
            <Stepper/>
        </div>
    </div>
  );
};

export default AddDealHead;


