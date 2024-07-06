import axios from 'axios'
import { auth0 } from '@/api/auth'

export interface EmploymentWrapper {
    employment: Employment[]
}

export interface Employment {
    id: string,
    socCode: string,
    date: string,
    value: number,
    forecasted: boolean
}

export const fetchEmployment = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<EmploymentWrapper>(import.meta.env.VITE_API_URL + `/employment/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}