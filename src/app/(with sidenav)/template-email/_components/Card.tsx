import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
    return (
        <div className="rounded-[10px] border-[1px] border-[#0000001a] bg-[#F3F4F6] w-[350px] h-[225px] transform transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer">
            <img src={imageUrl} alt={title} className="card-image rounded-t-[10px] m-auto h-[150px]" />
            <div className="flex flex-col bg-white rounded-b-[10px] overflow-hidden h-[73px] px-5 py-2">
                <h2 className="text-[#081A51] text-[16px] font-medium">{title}</h2>
                <p className="text-[#25273FB2] text-[14px] font-medium">{description}</p>
            </div>
        </div>
    );
};

export default Card;