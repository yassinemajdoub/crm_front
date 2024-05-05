"use client"
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';;
import SettingsSideBar from '@/components/svg/SettingsSideBar';

const ToggleConfigBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    // Function to toggle the sidebar
    const toggleSidebar = () => {
      setIsSidebarOpen((prev) => !prev);
      
    };
    const handleItemClick = (item: string) => {
      const isSelected = selectedItems.includes(item); // Check if the item is already selected
      let updatedSelectedItems;
  
      if (isSelected) {
        updatedSelectedItems = selectedItems.filter((i) => i !== item); // Remove item from the selected list
      } else {
        updatedSelectedItems = [...selectedItems, item]; // Add item to the selected list
      }
  
      setSelectedItems(updatedSelectedItems); // Update the state
      console.log('Selected Items:', updatedSelectedItems);
    };

  return (
    <div>        
      <div
              className="w-[26px] h-6 bg-blue-900 rounded-tl rounded-bl absolute flex items-center justify-center"
              style={{ top:'210px', right: 0 }} 
              onClick={toggleSidebar} 
          >
            {/* <VscSettings color="white" className="m-auto" /> */}
            <SettingsSideBar className=''/>
          </div>
          {isSidebarOpen && (
          <div
          className="absolute top-0 right-0 w-[300px] h-full bg-white shadow-lg"
          style={{zIndex: 15, transition: 'transform 0.3s', transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)' }} // Slide-in animation
          >
          {/* Sidebar content */}
          <div className="flex flex-row justify-evenly items-center">
          <h2 className="text-xl p-4">Sidebar Content</h2>
            <button
              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
              onClick={toggleSidebar}
            >
              <FiX size={16} />
            </button>
          </div>
          <ul>
          {/* Loop through a list of items with checkboxes */}
          {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
            <div
              className="flex items-center p-2 hover:bg-gray-200"
              key={index}
              onClick={() => handleItemClick(item)} // Click handler for the whole item
            >
              {/* Checkbox is updated based on state */}
              <input
                type="checkbox"
                className="mr-2 accent-[#1D1DCE]"
                checked={selectedItems.includes(item)} // Checkbox reflects selected state
                readOnly // Prevent direct state change from checkbox
              />
              <li>{item}</li>
            </div>
          ))}
          </ul>
          </div>
)}
</div>
  )
}

export default ToggleConfigBar