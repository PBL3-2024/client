import axios from 'axios'
import { auth0 } from '@/api/auth'

export interface UnemploymentWrapper {
    unemployment: Unemployment[]
}

export interface Unemployment {
    id: string,
    socCode: string,
    date: string,
    value: number
}

export const fetchUnemployment = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<UnemploymentWrapper>(import.meta.env.VITE_API_URL + '/unemployment/?socCode=00-0000', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}