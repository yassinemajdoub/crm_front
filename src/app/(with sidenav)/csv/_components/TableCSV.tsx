"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TableProps {
    csvFile: File;
    delimiter: string;
}

interface Attribute {
    name: string;
    type: string;
}

const attributes: Attribute[] = [
    { name: 'name', type: 'string' },
    { name: 'created_at', type: 'Date' },
    { name: 'age', type: 'number' },
];

const TableCSV: React.FC<TableProps> = ({ csvFile , delimiter }) => {
    const [data, setData] = useState<string[][]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [showedData, setShowedData] = useState<string[][]>([]);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsText(csvFile);
        reader.onload = () => {
            const csv = reader.result as string;
            const rows = csv.split('\n');
            const tableData = rows.map(row => row.split(delimiter));
            setData(tableData);
        };
    }, [csvFile]);

    useEffect(() => {
        setIsValid(selectedAttributes.every((attribute, index) => checkType(index) && attribute !== ''));
    }, [selectedAttributes]);

    const handleSelectChange = (index: number, value: string) => {
        const newSelectedAttributes = [...selectedAttributes];
        newSelectedAttributes[index] = value;
        setSelectedAttributes(newSelectedAttributes);
    };

    const checkType = (index: number) => {
        const attribute = attributes.find(attr => attr.name === selectedAttributes[index]);
        if (!attribute) return true;
        for (let i = 1; i < data.length; i++) {
            if (attribute.type === 'number' && isNaN(Number(data[i][index]))) {
                return false;
            }
            if (attribute.type === 'Date' && isNaN(Date.parse(data[i][index]))) {
                return false;
            }
        }
        return true;
    };

    // Check if selected attributes are not repeated
    const checkAttributes = (index: number) => {
        const attribute = selectedAttributes[index];
        return selectedAttributes.filter(attr => attr === attribute).length === 1;
    };

    const saveBackend = () => {
        if (isValid && selectedAttributes.every((_, index) => checkAttributes(index))){
            let dataObj = [];
            for (let i = 1; i < data.length; i++) {
                let obj: { [key: string]: any } = {};
                for (let j = 0; j < data[i].length; j++) {
                    obj[selectedAttributes[j]] = data[i][j];
                }
                dataObj.push(obj);
            }
            console.log(dataObj);
        } else {
            alert('Please select valid attributes for all columns.');
        }
    }

    //pagination logic
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data]);

    useEffect(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setShowedData(data.slice(start, end));
    }, [data, page]);
    

    return (
        <div className='w-full text-center'>
            <div className='w-[80%] ml-9'>
                <div className=' h-full mb-8 w-full scrollbar-thin scrollbar-webkit overflow-x-scroll'>
                    <table className="bg-white rounded-t-[24px] rounded-b-[24px] shadow-md border-collapse w-full">
                        <thead className="bg-white rounded-lg h-[70px]">
                            <tr className="rounded-full text-[18px]">
                            {data.length > 0 &&
                                data[0].map((_, index) => (
                                <th key={index} >
                                    <select
                                        value={selectedAttributes[index]}
                                        onChange={(e) => handleSelectChange(index, e.target.value)}
                                        className={`${checkType(index) ? 'bg-white' : 'bg-red-100 text-red-600'} font-medium min-w-42 text-sm rounded-lg block h-12 mx-6 px-3`}
                                    >
                                        <option value="">Select attribute</option>
                                        {attributes.map((attribute, idx) => (
                                            <option key={idx} value={attribute.name} className='h-11 bg-white text-black'>
                                            {attribute.name}
                                            </option>
                                        ))}
                                    </select>
                                </th>
                                ))}
                            </tr>
                            <tr className="rounded-full text-[18px]">
                            {data.length > 0 &&
                                data[0].map((header, index) => (
                                <th key={index} className="text-center font-medium relative h-12">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white text-[16px] overflow-hidden border-spacing-0">
                            {showedData.length > 0 &&
                            showedData.slice(1).map((row, index) => (
                                <tr key={index} className="text-center relative hover:scale-[101%] h-[75px]  transition-all hover:shadow-md hover:border-transparent border border-y-black/10">
                                {row.map((cell, index) => (
                                    <td
                                        key={index}
                                    >
                                        {cell}
                                    </td>
                                ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-row justify-between mb-8'>
                    <Button onClick={saveBackend} className='w-32'>Save</Button>
                    <div>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
                        <span className='mx-3'>{page} of {totalPages}</span>
                        <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCSV;
