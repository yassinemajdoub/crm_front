"use server"
import axios, { AxiosRequestConfig } from "axios";

const graphqlInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
        timeout: 10000,
    },
});

const apiInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
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


export const makeFetchRestRequest = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    abortSignal?: AbortSignal
) => {
    try {
        const config: AxiosRequestConfig = {
            url: endpoint,
            method,
            data: body,
            signal: abortSignal,
        };

        const response = await apiInstance(config);

        return { data: response.data, error: null };
    } catch (error) {
        console.log(`Error while executing ${method} request to ${endpoint}:`, error);
        return { error: error.message, data: null };
    }
};

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
