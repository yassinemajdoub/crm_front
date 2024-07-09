'use client'
import React, { useCallback, useEffect, useState } from 'react'; // Ensure `useState` is imported
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LeftNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const currentTab = searchParams.get('navigation') || 'Call'; 
  const [selectedTab, setSelectedTab] = useState<string>(currentTab);

  useEffect(() => {
    if (!searchParams.has('navigation')) {
      router.push(pathname + '?' + createQueryString('navigation', 'Call'));
    }
  }, [router, pathname, searchParams, createQueryString]);
  
  const handleTabClick = (tab:string) => {
    setSelectedTab(tab);
    router.push(pathname + '?' + createQueryString('navigation', tab));
  };

  return (
    <div>
      <div className='flex flex-row items-start justify-between w-[720px] h-16 gap-6'>
        {['Call', 'Meeting', 'Sms','Opportunities', 'Tasks'].map((tab, index) => (
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
      <div className="w-[720px] h-px bg-zinc-800 opacity-20" />
    </div>
  );
};

export default LeftNavigation;
