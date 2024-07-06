import axios from 'axios'
import { auth0 } from '@/api/auth'

export interface OccupationWrapper {
    occupation: Occupation[]
}

export interface Occupation {
    
    socCode: string,
    title: string,
    description: string,
    
}

export const fetchOccupation = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Occupation>(import.meta.env.VITE_API_URL + `/occupations/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const fetchChildOccupation = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<OccupationWrapper>(import.meta.env.VITE_API_URL + `/occupations/children/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}