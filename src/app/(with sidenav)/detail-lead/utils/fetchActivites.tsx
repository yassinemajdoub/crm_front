import { makeFetchGqlRequest } from "@/lib/axios";

export interface Meeting {
    id: number;
    body: string;
    createdAt:string;
    createdBy: {
        id: number;
        email: string;
      }
    lead: {
        id: number;
        name: string;
      }
  }

export async function fetchMeetingsByLeadId(params: { id: string }): Promise<{ data: Meeting[] | null; error: string | null }> {
  const queryparams = `lead_Id:"${params.id}"`;
  console.log(queryparams);
  const queryString = `
  {
    meetings(${queryparams}) {
      edges {
        node {
          id
          body
          createdAt
          createdBy {
            id
            email
          }
          lead {
            id
            name
          }
        }
      }
    }
  }
  `;

  const { data, error } = await makeFetchGqlRequest(queryString);

  if (error) {
    console.error("Error fetching meetings:", error);
    return { data: null, error }; // Return null on error
  }

  const meetings = data?.meetings?.edges?.map((edge: any) => edge.node) || [];

  const formattedMeetings = meetings.map((meeting: any) => ({
    id: meeting.id,
    body: meeting.body,
    createdAt: meeting.createdAt, 
    created_by: meeting.createdBy,
    lead: meeting.lead
  }));

  return { data: formattedMeetings, error: null };
}
