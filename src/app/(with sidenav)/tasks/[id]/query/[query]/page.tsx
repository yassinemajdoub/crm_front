'use client'
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import React from 'react'
import Select from 'react-select'

type QueryDetailPageProps = {
    params: {
      id: string;
      query: string;
    };
  };
  
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
  
  const QueryDetailPage: React.FC<QueryDetailPageProps> = ({ params }) => {
    return (
 
      <div className='flex flex-row gap-7 w-full h-full p-4'>
        <div className='flex flex-col gap-6 ml-4'>
          <div className="#202020 font-bold">Prospect search</div>
          <div className='flex flex-col p-3 gap-7 w-[230px] h-[680px] rounded-button-medium border rounded-lg border-dark-blue-100 bg-white shadow-custom'>
            <p className='font-bold'>Filters</p>
            <div className='flex flex-col'>
                <p>
                  Min Review
                </p>
                <Input>
                </Input>
            </div>
            <div className='flex flex-col'>
                <p>
                  Max Review
                </p>
                <Input>
                </Input>
            </div>
            <div className='flex items-center justify-between'>
                <p>
                  Has Website
                </p>
                <Checkbox >
                </Checkbox>
            </div>
            <div className='flex items-center justify-between'>
                <p>
                  Has Phone
                </p>
                <Checkbox >
                </Checkbox>
            </div>
            <div className='flex items-center justify-between'>
                <p>
                  is Spending on ads
                </p>
                <Checkbox >
                </Checkbox>
            </div>
            <div className='flex flex-col justify-between'>
                <p>
                Category In Is One Of              
                </p>
                <Select options={options} className='w-full' />
            </div>
          
            <div className='flex flex-col'>
                <p>
                  Min Rating
                </p>
                <Input>
                </Input>
            </div>
            <div className='flex flex-col justify-between'>
                <p>
                Sort</p>
                <Select options={options} className='w-full' />
            </div>
          </div>
        </div>
      </div>
 
    );
  };
  
  export default QueryDetailPage;