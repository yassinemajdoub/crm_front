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
    createdBy: meeting.createdBy,
    lead: meeting.lead
  }));

  return { data: formattedMeetings, error: null };
}



export interface Call {
  id: number;
  body: string;
  createdAt: string;
  createdBy: {
    id: number;
    email: string;
  };
}

export async function fetchCallsByLeadId(params: { id: string }): Promise<{ data: Call[] | null; error: string | null }> {
  const queryparams = `lead_Id:"${params.id}"`;
  console.log(queryparams);
  const queryString = `
  {
    calls(${queryparams}) {
      edges {
        node {
          id
          body
          createdAt
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
    console.error("Error fetching calls:", error);
    return { data: null, error }; // Return null on error
  }

  const calls = data?.calls?.edges?.map((edge: any) => edge.node) || [];

  const formattedCalls = calls.map((call: any) => ({
    id: call.id,
    body: call.body,
    createdAt: call.createdAt, 
    createdBy: call.createdBy,
  }));

  return { data: formattedCalls, error: null };
}

export interface SMSMessage {
  id: number;
  body: string;
  createdAt: string;
  createdBy: {
    id: number;
    email: string;
  };
}

export async function fetchSMSMessagesByLeadId(params: { id: string }): Promise<{ data: SMSMessage[] | null; error: string | null }> {
  const queryparams = `leadId:"${params.id}"`;
  console.log(queryparams);
  
  const queryString = `
    query {
      smsMessages(${queryparams}) {
        edges {
          node {
            id
            body
            createdAt
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
    console.error("Error fetching SMS messages:", error);
    return { data: null, error }; // Return null on error
  }

  const smsMessages = data?.smsMessages?.edges?.map((edge: any) => edge.node) || [];

  const formattedSMSMessages = smsMessages.map((sms: any) => ({
    id: sms.id,
    body: sms.body,
    createdAt: sms.createdAt,
    createdBy: sms.createdBy,
  }));

  return { data: formattedSMSMessages, error: null };
}

export interface SMSTemplate {
  label: string;
  value: string;
}

export async function fetchSMSTemplates(params: { id: string }): Promise<{ data: SMSTemplate[] | null; error: string | null }> {
  const queryparams = `leadId:"${params.id}"`;
  console.log(queryparams);
  
  const queryString = `
    query{
      smsTemplates{
        edges{
          node{
             id
            name
            body
          }
        }
      }
    }
  `;

  const { data, error } = await makeFetchGqlRequest(queryString);

  if (error) {
    console.error("Error fetching SMS messages:", error);
    return { data: null, error }; // Return null on error
  }

  const smsTemplates = data?.smsTemplates?.edges?.map((edge: any) => edge.node) || [];

  const formattedsmsTemplates = smsTemplates.map((sms: any) => ({
    label: sms.name,
    value: sms.id,
  }));

  return { data: formattedsmsTemplates, error: null };
}


export interface Email {
  id: string;
  subject: string;
  body: string | TrustedHTML;
  emailType: string;
  createdAt:string;
  initialBody: string;
  createdBy: {
    id: string;
    email: string;
  };
}

export async function fetchEmailsByid(params: { id: string }): Promise<{ data: Email[] | null; error: string | null }> {
  const queryparams = `leadId:"${params.id}"`;
  console.log(queryparams);
  
  const queryString = `
    query{
      emails(${queryparams}){
        edges{
          node{
            id
            subject
            body
            emailType
            createdAt
            initialBody
            createdBy{
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
    console.error("Error fetching emails:", error);
    return { data: null, error }; // Return null on error
  }

  const emails = data?.emails?.edges?.map((edge: any) => edge.node) || [];

  const formattedemails = emails.map((email: any) => ({
    id: email.id,
    body: email.body,
    subject: email.subject,
    emailType: email.emailType,
    initialBody: email.initialBody,
    createdAt: email.createdAt,
    createdBy: email.createdBy,
  }));

  return { data: formattedemails, error: null };
}