export interface Campaign {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    emailsCount: number;
  }

import { makeFetchGqlRequest } from "@/lib/axios";

export async function fetchCampaigns(): Promise<{ data: Campaign[] | null; error: string | null }> {
  const queryString = `
    query {
      compaigns {
        edges {
          node {
            id
            name
            startDate
            endDate
            emailsCount
            isActive
          }
        }
      }
    }
  `;

  const { data, error } = await makeFetchGqlRequest(queryString);

  if (error) {
    console.error("Error fetching campaigns:", error);
    return { data: null, error }; // Return null on error
  }

  const campaigns: Campaign[] = data?.compaigns?.edges?.map((edge: any) => edge.node) || [];

  const formattedcampaigns = campaigns.map((campaign: any) => ({
    id: campaign.id,
    name: campaign.name,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    isActive:campaign.isActive,
    emailsCount: campaign.emailsCount,
  }));

  return { data: formattedcampaigns, error: null };
}
