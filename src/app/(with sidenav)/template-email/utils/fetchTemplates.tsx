import { makeFetchGqlRequest } from "@/lib/axios";

export interface TemplateCategory {
  id: string;
  name: string;
}

export async function fetchTemplateCategories(): Promise<{ data: TemplateCategory[] | null; error: string | null }> {
  const queryString = `
    query {
      templateCategories {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  const { data, error } = await makeFetchGqlRequest(queryString);

  if (error) {
    console.error("Error fetching template categories:", error);
    return { data: null, error };
  }

  const templateCategories: TemplateCategory[] = data?.templateCategories?.edges?.map((edge: any) => edge.node) || [];

  return { data: templateCategories, error: null };
}
