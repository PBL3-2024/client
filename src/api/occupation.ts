import axios from 'axios'

export interface OccupationWrapper {
    occupation: Occupation[]
}

export interface Occupation {
    
    socCode: string,
    title: string,
    description: string,
    
}

export const fetchOccupation = async function(socCode: string) {
    return axios.get<Occupation>(import.meta.env.VITE_API_URL + `/occupations/?socCode=${socCode}`)
}

export const fetchChildOccupation = async function(socCode: string) {
    return axios.get<OccupationWrapper>(import.meta.env.VITE_API_URL + `/occupations/children/?socCode=${socCode}`)
}