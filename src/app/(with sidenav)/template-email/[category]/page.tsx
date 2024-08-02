import React from 'react';
import NavBar from '../_components/NavBar';
import Card from '../_components/Card';
import { fetchTemplateCategories, TemplateCategory } from '../utils/fetchTemplates';


export async function getCategoriesTemplates(): Promise<TemplateCategory[] | null> {
    const { data, error } = await fetchTemplateCategories();
    if (error) {
      throw new Error(`Failed to fetch leads: ${error}`);
    }
    return data;
  }
  
  export default async function Page ({params}: {params: {category:string}}){
    const data = await getCategoriesTemplates();
    return (
        <div>
            <NavBar selectedCategory={params.category} data={data} />
            <p className='text-[#202020] font-semibold text-[24px] mt-7'>{params.category}</p>
            <div className='mt-4 flex flex-wrap justify-between gap-6'>
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
                <Card imageUrl='https://via.placeholder.com/150' title='Card Title' description='Card Description' />
            </div>
        </div>
    );
};

;