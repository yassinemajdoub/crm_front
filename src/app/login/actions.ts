"use server"

import { makeAxiosGqlRequest } from "@/lib/axios"
import axios from "axios";
import { cookies } from 'next/headers'
// import { revalidatePath } from "next/cache";

interface SignInResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export async function SignIn(formData: FormData): Promise<SignInResponse> {
    try {
        const email=formData.get('email')
        const password=formData.get('password')
        console.log(email)
        console.log(password)
        // Attempt to post login data to the API endpoint
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/login/`, {
            email,
            password,
        });

        const token = response.data?.access_token;
        if (token) {
            cookies().set('token', token);
            console.log(token)
        }

        return {
            success: true,
            data: response.data,
        };

    } catch (error: unknown) {
        let errorMessage = 'An unexpected error occurred.';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = `Error ${error.response.status}: ${error.response.data.message || 'Something went wrong.'}`;
                console.log(errorMessage)
            } else if (error.request) {
                // If the request was made but no response was received
                errorMessage = 'No response from server. Please check your network connection.';
                console.log(errorMessage)
            }
        } else if (error instanceof Error){
            errorMessage = error.message;
            console.log(errorMessage)
        }

        return {
            success: false,
            error: errorMessage,
        };
    }
}






// export async function SignIn(email: string, passowrd: string) {

//     const mutationString = `
//     mutation{
//       createAttribute(
//         description : "" , 
//         name : "${name}" , 
//         price : 0 , 
//         values : ${JSON.stringify(values)}
//       ){
//         attribute{
//           name
//           id
//           values {
//             value
//             id
//           }
//         }
//       }
//     }
//     `
  
  
//     const { data, error } = await makeAxiosGqlRequest(mutationString)
  
//     // if (data) {
//     //   revalidatePath("/manageProducts/newProduct")
//     // }
//     return error ? { error } : { data }
//   }
  