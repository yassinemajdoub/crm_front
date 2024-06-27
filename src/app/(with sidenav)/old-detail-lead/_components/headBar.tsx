

const LeadDetailsHeadBar = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-between py-0 pr-0 pl-[5px] box-border max-w-full gap-[20px] text-left text-5xl text-black font-poppins mq750:flex-wrap">
      <h1 className="m-0 relative text-inherit leading-[46px] font-semibold font-inherit mq450:text-lgi mq450:leading-[37px]">
        Detail lead
      </h1>
      <div className="h-10 w-[547px] flex flex-row items-start justify-start gap-[7px] max-w-full text-sm text-white">
        <div className="h-[41px] flex-1 rounded-lg bg-white box-border flex flex-row items-start justify-start p-2 gap-[8px] max-w-[calc(100%_-_121px)] border-[1px] border-solid border-primary">
          <div className="h-[41px] w-[427px] relative rounded-lg bg-white box-border hidden max-w-full border-[1px] border-solid border-primary" />
          <img
            className="h-6 w-6 relative object-contain z-[1]"
            alt=""
            src="/ic-search-1@2x.png"
          />
          <input
            className="w-[59px] [border:none] [outline:none] bg-[transparent] h-[22px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border font-poppins font-medium text-sm text-gray-200"
            placeholder="Search…"
            type="text"
          />
        </div>
        <div className="rounded-lg bg-primary flex flex-row items-start justify-start pt-2.5 pb-[9px] pr-1.5 pl-5 gap-[13px]">
          <div className="h-10 w-[114px] relative rounded-lg bg-primary hidden" />
          <div className="relative font-semibold inline-block min-w-[58px] z-[1]">
            Convert
          </div>
          <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
            <img
              className="w-[17px] h-[17px] relative overflow-hidden shrink-0 object-contain z-[1]"
              alt=""
              src="/ic-chevron@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsHeadBar;
