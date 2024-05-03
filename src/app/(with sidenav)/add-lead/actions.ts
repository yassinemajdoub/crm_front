import { makeAxiosGqlRequest } from "@/lib/axios"


export async function executeGqlRequest(str: string) {
    const { data, error } = await makeAxiosGqlRequest(str)
    return { data: data, error: error }
  }