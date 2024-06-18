import axios from 'axios'

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
    return axios.get<UnemploymentWrapper>(import.meta.env.VITE_API_URL + '/unemployment/?socCode=00-0000')
}