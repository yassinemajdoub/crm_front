import React from 'react'
import { useState } from 'react';
const NavigationRight = () => {
    const [selectedItem, setSelectedItem] = useState('Informations');
    const handleSelection = (item) => {
        setSelectedItem(item); // Update the selected item
      };


    const isItemSelected = (item) => {
        return item === selectedItem;
    };
  return (
    <div className='w-[272px] border'>
    <div className='w-[239px] h-[311px] flex flex-col gap-1 items-start border bg-white border-neutral-200 ml-6 mr-2 py-6'>
      {[
        { name: 'Informations' },
        { name: 'Activites' },
        { name: 'contacts' },
        { name: 'Notes' },
        { name: 'Attachements' },
      ].map((item, index) => (
        <div
          key={index}
          className={`w-full h-[43px] px-6 py-2 relative ${isItemSelected(item.name) ? 'bg-violet-700/10' : ''}`}
          onClick={() => handleSelection(item.name)}
        >
          {isItemSelected(item.name) && (
            <div className="w-[5.09px] h-[43px] absolute left-[0.85px] top-0 bg-blue-800 rounded-tr-md rounded-br-md" /> 
          )}
          <p className="text-black text-lg font-medium font-['Poppins']">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default NavigationRight