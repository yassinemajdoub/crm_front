import React from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Controller,Control } from "react-hook-form";
import { FormFields } from './formLead';

interface MultipleSelectorCreatableProps {
    control: Control<FormFields>;
    className: string;
  }

const OPTIONS: Option[] = [
  { label: 'nextjs', value: 'nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember', disable: true },
  { label: 'Gatsby', value: 'gatsby', disable: true },
  { label: 'Astro', value: 'astro' },
];

const MultipleSelectorCreatable = ({ control,className }:MultipleSelectorCreatableProps) => {
  return (
    // <div className="w-full px-10">
      <Controller
        name="multiSelect"
        control={control}
        defaultValue={[]} // Ensure it's an array of `Option`
        render={({ field }) => (
          <MultipleSelector
            {...field} 
            defaultOptions={OPTIONS}
            className={className}
            placeholder="Type something that does not exist in dropdowns..."
            creatable
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                No results found.
              </p>
            }
          />
        )}
      /> 
    // </div>
  );
};

export default MultipleSelectorCreatable;
