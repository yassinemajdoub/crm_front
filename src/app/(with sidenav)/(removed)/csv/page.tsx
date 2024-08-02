// "use client"
// import React, { useState } from 'react';
// import FromFile from './_components/FromFile';
// import TableCSV from './_components/TableCSV'; 
// import { Button } from '@/components/ui/button';
// import { Toaster } from "@/components/ui/sonner"

// const CsvPage: React.FC = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [isFileSent, setIsFileSent] = useState(false); 
//     const [delimiter, setDelimiter] = useState<string>(',');

//     const handleSend = () => {
//         setIsFileSent(true); 
//     };

//     return (
//         <div className='w-full h-[90vh] items-center justify-center flex mt-16'>
//             {isFileSent && file ? <TableCSV setFile={setFile} setIsFileSent={setIsFileSent} csvFile={file} delimiter={delimiter}/> : <div className="flex flex-col gap-4">
//                 <FromFile file={file} setFile={setFile} setDelimiter={setDelimiter} delimiter={delimiter}/>
//                 <Button className='py-2 bg-[#141552] text-[#DBE7FF] text-center rounded-[7px] cursor-pointer hover:bg-[#1C1C72] font-medium text-[14px] shadow-lg' value="Upload" disabled={file === null || !delimiter} onClick={handleSend}> Next</Button>
//             </div>}
//             <Toaster richColors />
//         </div>
//     );
// };

// export default CsvPage;