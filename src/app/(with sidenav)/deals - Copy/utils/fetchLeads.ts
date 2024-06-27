import { makeAxiosGqlRequest } from '@/lib/axios';
import { Lead } from '@/sotres/leadsStore';

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
          niches {
            name
          }
          businessSector {
            name
          }
          stage {
            name
          }
          status {
            name
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
  
    const { data, error } = await makeAxiosGqlRequest(queryString);
  
    if (error) {
      console.error("Error fetching leads:", error);
      return { data: [], error }; // Return empty array on error
    }
  
    const leadEdges = data?.leads?.edges || [];
    const allLeads: Lead[] = leadEdges.map((edge: any) => {
      const node = edge.node;
  
      return {
        id: node.id,
        name: node.name,
        email: node.email,
        phone: node.phone,
        description: node.description,
        rating: node.rating,
        has_website: node.hasWebsite,
        spending_on_ads: node.spendingOnAds,
        number_of_employes: node.numberOfEmployes,
        annual_revenue: node.annualRevenue,
        niches: node.niches.map((niche: any) => niche.name),
        business_sector: node.businessSector?.name,
        stage: node.stage?.name,
        status: node.status?.name,
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