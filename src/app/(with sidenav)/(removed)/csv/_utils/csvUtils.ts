interface Attribute {
    name: string;
    type: string;
  }
  
export interface GroupedAttributes {
    [key: string]: Attribute[]; 
  }
  
  export const groupedAttributes: GroupedAttributes = {
    Contact: [
      { name: 'phone', type: 'String' },
      { name: 'email', type: 'String' },
      { name: 'email2', type: 'String' },
    ],
    SocialMedia: [
      { name: 'facebook', type: 'String' },
      { name: 'instagram', type: 'String' },
      { name: 'website', type: 'String' },
    ],
    Identification: [
      { name: 'tax_identification_number', type: 'String' },
      { name: 'owner', type: 'ID' },
    ],
    Business: [
      { name: 'spending_on_ads', type: 'Boolean' },
      { name: 'source', type: 'String' },
      { name: 'description', type: 'String' },
      { name: 'annual_revenue', type: 'Float' },
      { name: 'number_of_employees', type: 'Int' },
      { name: 'rating', type: 'Float' },
    ],
    Additional: [
      { name: 'photo', type: 'String' },
      { name: 'has_website', type: 'Boolean' },
    ],
  };
  