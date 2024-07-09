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
        const error= response.errors?.[0]?.message
        console.log(error)
        return { data, error }
    } catch (error) {
        console.log("error while executing this query : ", query)
        return { error, data: null }
    }
}

export const makeFetchGqlRequest = async (query: string, abortSignal?: AbortSignal) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query}),
            cache: 'no-store' ,
            signal: abortSignal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const data = result.data;

        return { data, error: result.errors?.[0]?.message };
    } catch (error) {
        console.log("error while executing this query : ", query);
        return { error, data: null };
    }
};
