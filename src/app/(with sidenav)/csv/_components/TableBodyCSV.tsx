import React from 'react';

interface TableBodyProps {
  data: any[]; // Adjust the type to fit your data structure
}

const TableBodyCSV: React.FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody className="bg-white text-[16px] overflow-hidden border-spacing-0">
      {data.length > 0 &&
        data.slice(1).map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="text-center relative hover:scale-[101%] h-[75px] transition-all hover:shadow-md hover:border-transparent border border-y-black/10"
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBodyCSV;
