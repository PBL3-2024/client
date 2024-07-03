import axios from 'axios'

export interface Demand {
    socCode: string,
    value: number
}

export const fetchDemand = async function(socCode: string) {
    return axios.get<Demand>(import.meta.env.VITE_API_URL + `/demand/?socCode=${socCode}`)
}

export const editDemand = async function(socCode: string, demand: Demand) {
    return axios.post<Demand>(import.meta.env.VITE_API_URL + `/demand/?socCode=${socCode}`, demand)
}