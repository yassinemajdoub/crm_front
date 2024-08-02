export interface Email {
    id: string;
    subject: string;
    emailType: string;
    initialBody: string;
    body: string;
    isSent: boolean;
    createdBy: {
      email: string;
    };
  }
  
  import { makeFetchGqlRequest } from "@/lib/axios";
  
  export async function fetchEmails(params: { id: string }): Promise<{ data: Email[] | null; error: string | null }> {
    const queryparams = `campaign_Id:"${params.id}"`;
    const queryString = `
      query {
        emails(${queryparams}) {
          edges {
            node {
              id
              subject
              emailType
              initialBody
              body
              isSent
              createdBy {
                email
              }
            }
          }
        }
      }
    `;
  
    const { data, error } = await makeFetchGqlRequest(queryString);
  
    if (error) {
      console.error("Error fetching emails:", error);
      return { data: null, error };
    }
  
    const emails: Email[] = data?.emails?.edges?.map((edge: any) => edge.node) || [];
  
    const formattedEmails = emails.map((email: any) => ({
      id: email.id,
      subject: email.subject,
      emailType: email.emailType,
      initialBody: email.initialBody,
      body: email.body,
      isSent: email.isSent,
      createdBy: {
        email: email.createdBy.email,
      },
    }));
  
    return { data: formattedEmails, error: null };
  }
  
  // Fetch email templates
export async function fetchEmailTemplates() {
  const queryString = `
      query {
          emailTemplates {
              edges {
                  node {
                      id
                      name
                      subject
                      body
                      createdBy {
                          id
                          email
                      }
                  }
              }
          }
      }
  `;

  const { data, error } = await makeFetchGqlRequest(queryString);

  if (error) {
      console.error("Error fetching email templates:", error);
      return { templates: [], error }; // Return empty array on error
  }

  const templates = data?.emailTemplates?.edges.map((edge: any) => {
      const node = edge.node;
      return {
          value: node.id,
          label: node.name,
      };
  });

  return { templates, error: null };
}