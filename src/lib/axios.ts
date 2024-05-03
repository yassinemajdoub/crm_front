"use server"
import axios from "axios";

const graphqlInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
        timeout: 10000,
    },
});

export const makeAxiosGqlRequest = async (query: string, abortSignal?: AbortSignal) => {
    try {
        const { data: response } = await graphqlInstance.post("/", { query }, { signal: abortSignal })

        const data = response?.data

        return { data, error: response.errors?.[0]?.message }
    } catch (error) {
        console
            .log("error while executing this query : ", query)
        return { error, data: null }
    }
}