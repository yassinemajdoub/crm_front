import { makeFetchRestRequest } from "@/lib/axios";


export interface Query {
    id: string;
    query_name: string;
    status: string;
    started_at: string | null;
    ended_at: string | null;
    data: any;
  }
export interface TaskDetail {
    task_name: string;
    queries:Query[];
  }

export async function fetchQueries(taskId: number): Promise<{ data: TaskDetail | null; error: string | null }> {
const endpoint = `scraper/task/${taskId}/queries/`;
const { data, error } = await makeFetchRestRequest(endpoint);

if (error) {
    console.error("Error fetching queries:", error);
    return { data: null, error }; // Return null on error
}

return { data, error: null };
}