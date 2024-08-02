import { makeFetchGqlRequest } from "@/lib/axios";

export interface Task {
    id: string;
    name: string;
    completedQueryCount: number;
    queryCount: number;
  }

  
  export async function fetchProspectingTasks(): Promise<{ data: Task[] | null; error: string | null }> {
    const queryString = `
      query {
        tasksScrapper {
          edges {
            node {
              id
              name
              completedQueryCount
              queryCount
            }
          }
        }
      }
    `;
  
    const { data, error } = await makeFetchGqlRequest(queryString);
  
    if (error) {
      console.error("Error fetching tasks:", error);
      return { data: null, error }; // Return null on error
    }
  
    const tasks: Task[] = data?.tasksScrapper?.edges?.map((edge: any) => edge.node) || [];
  
    const formattedTasks = tasks.map((task: any) => ({
      id: task.id,
      name: task.name,
      completedQueryCount: task.completedQueryCount,
      queryCount: task.queryCount,
    }));
  
    return { data: formattedTasks, error: null };
  }