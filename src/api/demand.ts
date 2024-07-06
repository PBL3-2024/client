import axios from 'axios'
import { auth0 } from '@/api/auth'

export interface Demand {
    socCode: string,
    value: number
}

export const fetchDemand = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Demand>(import.meta.env.VITE_API_URL + `/demand/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const editDemand = async function(socCode: string, demand: Demand) {
    const token = await auth0.getAccessTokenSilently();
    return axios.post<Demand>(import.meta.env.VITE_API_URL + `/demand/?socCode=${socCode}`, demand, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}