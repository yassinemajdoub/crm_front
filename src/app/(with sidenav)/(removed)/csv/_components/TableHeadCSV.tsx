import React from 'react';
import { Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select';
 import { GroupedAttributes } from '../_utils/csvUtils';

interface TableHeadProps {
  data: any[][]; // Adjust the type to fit your data structure
  selectedAttributes: string[];
  handleSelectChange: (index: number, value: string) => void;
  checkType: (index: number) => boolean;
  attributes: { name: string }[];
  groupedAttributes: GroupedAttributes;
}

const TableHeadCSV: React.FC<TableHeadProps> = ({
  data,
  selectedAttributes,
  handleSelectChange,
  checkType,
  attributes,
  groupedAttributes
}) => {
  return (
    <thead className="bg-white rounded-lg h-[70px]">
      <tr className="rounded-full text-[18px]">
        {data.length > 0 &&
          data[0].map((_, index) => (
            <th key={index}>
                <Select onValueChange={(value) => handleSelectChange(index, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Attribute" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px] overflow-y-auto">
                      {Object.entries(groupedAttributes).map(([groupName, attributes]) => (
                        <SelectGroup key={groupName}>
                          <SelectLabel>{groupName}</SelectLabel>
                          {attributes.map((attribute, idx) => (
                            <SelectItem key={idx} value={attribute.name}>
                              {attribute.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                      </SelectContent>
                    </Select>
            </th>
          ))}
      </tr>
      <tr className="rounded-full text-[18px]">
        {data.length > 0 &&
          data[0].map((header, index) => (
            <th key={index} className="text-center font-medium relative h-12">
              {header}
            </th>
          ))}
      </tr>
    </thead>
  );
};

export default TableHeadCSV;
