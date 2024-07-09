import React from 'react';

interface Item {
  value: number;
  label: string;
}

interface ReusableComponentProps {
  items: Item[];
}

const ReusableComponent: React.FC<ReusableComponentProps> = ({ items }) => {
  return (
    <div className='flex gap-28'>
      {items.map((item, index) => (
        <div key={index} className='flex justify-center items-center flex-col gap-4'>
          <p className="text-zinc-600 text-2xl font-semibold">{item.value}</p>
          <p className="text-zinc-500 text-[10px] font-normal">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ReusableComponent;
