"use client"

import { Input } from '@/components/ui/input'
import React, { useState } from 'react';
import Select from 'react-select';
import { TiDelete } from "react-icons/ti";

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const countryOptions = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'MEX', label: 'Mexico' },
  { value: 'BRA', label: 'Brazil' },
  { value: 'ARG', label: 'Argentina' },
  { value: 'FRA', label: 'France' },
  { value: 'GER', label: 'Germany' },
  { value: 'ITA', label: 'Italy' },
  { value: 'ESP', label: 'Spain' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'TN', label: 'Tunisia' },
];

const Page = () => {
  const [queries, setQueries] = useState<string[]>([]); // State to hold the list of queries
  const [currentQuery, setCurrentQuery] = useState(''); // State for the current input value

  // Handler to add the current query to the list
  const handleAddQuery = () => {
    if (currentQuery.trim() !== '') { // Only add if the input is not empty
      setQueries([currentQuery, ...queries]); // Add the current query to the top of the list
      setCurrentQuery(''); // Clear the current input
    }
  };
    // Handler to remove a query by index
    const handleRemoveQuery = (index: number) => {
      const updatedQueries = [...queries]; // Create a copy of the queries array
      updatedQueries.splice(index, 1); // Remove the query at the specified index
      setQueries(updatedQueries); // Update the state with the modified array
    };

  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(null);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };
  return (
    <div className='flex flex-col items-center justify-center gap-9'>
        <section className="w-[500px] h-[100px] border-4">
            <p className="text-center text-neutral-800 text-xl font-semibold font-['Poppins'] leading-[46px">Build your ideal prospect list</p>
            <p className="text-center text-neutral-800 text-xs font-semibold font-['Poppins'] leading-[46px]">Use the filiters to get meaningful results, then reveal contact details.</p>
        </section>

        <section className='flex flex-col w-[668px] h-full gap-6 border-4 p-5'>
            <p className='font-bold'>Search Lead</p>
            <section className='flex flex-col gap-3'>
            <div>
              <div className='flex flex-row justify-between'>
                <p>Add Query</p>
                <div
                  className="w-7 h-[27px] px-[9px] py-[3px] bg-blue-100 rounded-[5px] mb-2 cursor-pointer hover:bg-blue-500" // Make the button clickable
                  onClick={handleAddQuery} // Handler for adding a new query
                >
                  +
                </div>
            </div>
              {/* Input with value from currentQuery and a handler for onChange */}
              <Input
                value={currentQuery} // Set the current input value
                onChange={(e) => setCurrentQuery(e.target.value)} // Update current input on change
              />
            </div>
              {/* Render additional input fields for each query */}
              {queries.map((query, index) => (
                <div key={index} className="relative">
                  <Input
                    value={query}
                  />
                  {/* X icon to remove the query */}

                      <TiDelete className="absolute top-0 right-0  hover:text-red-600 cursor-pointer" style={{ height: '2.5rem', width: '1.5rem' }} onClick={() => handleRemoveQuery(index)}/>
                </div>
            ))}
            </section>
            <section className='flex flex-col gap-5'>
                <p className='font-bold'>Extract Cities by Country</p>
                <div className='flex flex-col'>
                  <p>Country</p>
                  <Select
                      isClearable={true} 
                      options={countryOptions} 
                    />
                </div>
                <div className='flex flex-row gap-5'>
                  <p>Randomize Cities (Recommended)</p>
                   <Switch/>
                </div>
                <div className='flex flex-row gap-3 items-end justify-end'>
                  <Button className='bg-blue-800 hover:bg-blue-500 '> Run </Button> 
                  <Button className='bg-blue-100 text-black hover:bg-blue-500'> Reset to default </Button>
                </div>

            </section>
      </section>

    </div>
  )
}

export default Page
