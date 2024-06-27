import React from 'react';
import NavBar from '../_components/NavBar';
import Card from '../_components/Card';

const Page = ({params}: {params: {category:string}}) => {
    return (
        <div>
            <NavBar selectedCategory={params.category} />
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

export default Page;