'use client'
import React, { useState } from 'react'; // Ensure `useState` is imported

const LeftNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('Call'); // Default selected tab

  const handleTabClick = (tab) => {
    setSelectedTab(tab); // Update the state when a tab is clicked
  };

  return (
    <div>
      <div className='flex flex-row items-start justify-between w-[629px] h-16 gap-6'>
        {['Call', 'Meeting', 'Email', 'Tasks'].map((tab, index) => (
          <div
            key={index}
            className="w-[90px] h-full flex items-center justify-center relative"
            onClick={() => handleTabClick(tab)} // Handle the click
          >
            {tab}
            {selectedTab === tab && ( // Conditionally render the line based on the state
              <div className="w-[90px] h-[3px] absolute left-0 bottom-0 bg-blue-800"></div> // The blue line when selected
            )}
          </div>
        ))}
      </div>

      {/* Separator or other divider */}
      <div className="w-[690px] h-px bg-zinc-800 opacity-20" />
    </div>
  );
};

export default LeftNavigation;
