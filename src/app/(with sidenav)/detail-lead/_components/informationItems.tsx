import React from 'react';

interface InfoItem {
  label: string;
  value: string | number;
}

interface ReusableInfoBoxProps {
  items: InfoItem[];
}

const ReusableInfoBox: React.FC<ReusableInfoBoxProps> = ({ items }) => {
  return(
      <div className='flex flex-col pl-8 pb-3 pt-6'>
        <div className='flex justify-between px-4 py-4 rounded-[5px] shadow border border-black/opacity-20 '>
          <div className='w-[280px] flex flex-col gap-6'>
            {items.map((item, index) => (
              <div key={index} className='flex items-center'>
                <div className="text-stone-900 text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>
          <div className='w-[280px] flex flex-col gap-7'>
            {items.map((item, index) => (
              <div key={index} className='flex items-center'>
                <div className="text-neutral-800/opacity-90 text-xs font-medium">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ReusableInfoBox;
