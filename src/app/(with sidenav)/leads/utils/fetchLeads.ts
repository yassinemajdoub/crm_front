import Linkden from '@/components/svg/linkden';
import { makeAxiosGqlRequest,makeFetchGqlRequest } from '@/lib/axios';
import { Lead } from '@/sotres/leadsStore';
import { Value } from '@radix-ui/react-select';

const GET_LEADS_QUERY = `
  query {
    leads {
      edges {
        node {
          id
          name
          email
          phone
          description
          rating
          hasWebsite
          spendingOnAds
          numberOfEmployes
          annualRevenue
          source
          owner{
          email
          }

          taxIdentificationNumber
          niches {
            name
          }
          businessSector {
            name
          }
          stage {
            id
            name
            color
            textColor
          }
          status {
            id
            name
            color
            textColor
          }
          contacts {
            firstName
            lastName
            gender
          }
          photo
        }
      }
    }
  }
`;

export async function fetchLeads() {
    const queryString = GET_LEADS_QUERY;
  
    const { data, error } = await makeFetchGqlRequest(queryString);
  
    if (error) {
      console.error("Error fetching leads:", error);
      return { data: [], error }; // Return empty array on error
    }
  
    const leadEdges = data?.leads?.edges || [];
    const allLeads: Lead[] = leadEdges.map((edge: any) => {
      const node = edge.node;
      console.log(node.numberOfEmployes)
      return {
        id: parseInt(node.id),
        name: node.name,
        email: node.email,
        phone: node.phone,
        description: node.description,
        rating: node.rating,
        has_website: node.hasWebsite,
        spending_on_ads: node.spendingOnAds,
        number_of_employes: node.numberOfEmployes,
        owner:node.owner?.email,
        annual_revenue: node.annualRevenue,
        niches: node.niches.map((niche: any) => niche.name),
        business_sector: node.businessSector?.name,
        source:node.source,
        TINumber:node.taxIdentificationNumber,
        stage: node.stage,
        status: node.status,
        contacts: node.contacts.map((contact: any) => ({
          first_name: contact.firstName,
          last_name: contact.lastName,
          gender: contact.gender,
        })),
        photo: node.photo,
      };
    });

    return { data: allLeads, error: null };
  }



export async function fetchLeadById(params:{ id : number}): Promise<{ data: Lead | null; error: string | null }> {

  const queryparams=`id :${params.id}`
  console.log(queryparams)
  const queryString = `
  {
      lead(${queryparams}) {
        id
        name
        email
        phone
        description
        rating
        hasWebsite
        spendingOnAds
        numberOfEmployes
        annualRevenue
        source
        website
        email2
        facebook
        instagram
        linkden
        instagram
        tiktok
        notes{
            id
            title
            content
            createdBy{
              id
              email
            }
            createdAt
            updatedAt
          }
        address{
          state
          city
          country
        }
        owner{
          email
        }
        taxIdentificationNumber
        niches {
          name
        }
        businessSector {
          name
        }
      tags{
        name
      }
        stage {
          id
          name
          color
          textColor
        }
        status {
          id
          name
          color
          textColor
        }
        contacts {
          firstName
          lastName
          gender
          email
          phone
          role
        }
        photo
      }
    }
  `;
  
  const { data, error } = await makeFetchGqlRequest(queryString);

  if (error) {
    console.error("Error fetching lead:", error);
    return { data: null, error }; // Return null on error
  }

  const lead = data?.lead;

  if (!lead) {
    return { data: null, error: "Lead not found" };
  }

  const formattedLead = {
    id: parseInt(lead.id),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    description: lead.description,
    rating: lead.rating,
    has_website: lead.hasWebsite,
    spending_on_ads: lead.spendingOnAds,
    number_of_employes: lead.numberOfEmployes,
    annual_revenue: lead.annualRevenue,
    source: lead.source,
    owner: lead.owner?.email,
    address: lead.address,
    website: lead.website,
    facebook:lead.facebook,
    instagram:lead.instagram,
    Linkden:lead.linkden,
    tiktok:lead.tiktok,
    email2:lead.email2,
    TINumber: lead.taxIdentificationNumber,
    niches: lead.niches.map((niche:any) => niche.name),
    business_sector: lead.businessSector?.name,
    notes: lead.notes,
    stage: lead.stage,
    status: lead.status,
    tags:lead.tags.map((tag:any) => tag.name),
    contacts: lead.contacts,
    photo: lead.photo,
  };

  return { data: formattedLead, error: null };
}

  const GET_STAGES_AND_STATUSES_QUERY = `
  query {
    leadsStages {
      edges {
        node {
          id
          name
          color
          textColor
        }
      }
    }
    leadsStatus {
      edges {
        node {
          id
          name
          color
          textColor
        }
      }
    }
  }
`;

export async function fetchStagesAndStatuses() {
    const queryString = GET_STAGES_AND_STATUSES_QUERY;
  
    const { data, error } = await makeAxiosGqlRequest(queryString);
  
    if (error) {
      console.error("Error fetching stages and statuses:", error);
      return { stages: [], statuses: [], error }; // Return empty arrays on error
    }
  
    const stages = (data?.leadsStages?.edges || []).map((edge: any) => {
      const node = edge.node;
      return {
        id: node.id,
        name: node.name,
        color: node.color,
        textColor: node.textColor,
      };
    });
  
    const statuses = (data?.leadsStatus?.edges || []).map((edge: any) => {
      const node = edge.node;
      return {
        id: node.id,
        name: node.name,
        color: node.color,
        textColor: node.textColor,
      };
    });
  
    return { stages, statuses, error: null }; // Return fetched data
  }

  const GET_BUSINESS_SECTORS_QUERY = `
  query {
    businessSectors {
      edges {
        node {
          name
        }
      }
    }
  }
`;
export async function fetchBusinessSectors() {
  const queryString = GET_BUSINESS_SECTORS_QUERY;

  const { data, error } = await makeAxiosGqlRequest(queryString);

  if (error) {
    console.error("Error fetching business sectors:", error);
    return { sectors: [], error }; // Return empty array on error
  }

  const sectors = (data?.businessSectors?.edges || []).map((edge:any) => {
    const node = edge.node;
    return {
      value: node.name,
      label: node.name,
    };
  });

  return { sectors, error: null }; // Return fetched data
}

const GET_TAGS_QUERY = `
  query {
    tags {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
export async function fetchTags() {
  const queryString = GET_TAGS_QUERY;

  const { data, error } = await makeAxiosGqlRequest(queryString);

  if (error) {
    console.error("Error fetching tags:", error);
    return { tags: [], error }; // Return empty array on error
  }

  const tags = (data?.tags?.edges || []).map((edge:any) => {
    const node = edge.node;
    return {
      value: node.id,
      label: node.name,
    };
  });

  return { tags, error: null }; // Return fetched data
}

export async function fetchStagesAndStatusesOptions() {
  const queryString = GET_STAGES_AND_STATUSES_QUERY;

  const { data, error } = await makeAxiosGqlRequest(queryString);

  if (error) {
    console.error("Error fetching stages and statuses:", error);
    return { stages: [], statuses: [], error }; // Return empty arrays on error
  }

  const stagesOptions = (data?.leadsStages?.edges || []).map((edge: any) => {
    const node = edge.node;
    return {
      value: node.name,
      label: node.name,
    };
  });

  const statusesOptions = (data?.leadsStatus?.edges || []).map((edge: any) => {
    const node = edge.node;
    return {
      value: node.name,
      label: node.name,

    };
  });

  return { stagesOptions, statusesOptions, error: null };
}

const NichesQuery=  `
query{
      niches{
              edges{
                node{
                  name
                }
              }
            }
          }
`
export async function fetchNiches() {
  const queryString = NichesQuery;

  const { data, error } = await makeAxiosGqlRequest(queryString);

  if (error) {
    console.error("Error fetching Niches:", error);
    return { niches: [], error }; // Return empty array on error
  }

  const niches = (data?.niches?.edges || []).map((edge:any) => {
    const node = edge.node;
    return {
      value: node.name,
      label: node.name,
    };
  });

  return { niches, error: null }; // Return fetched data
}