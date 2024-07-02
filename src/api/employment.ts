import axios from 'axios'

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
    return axios.get<EmploymentWrapper>(import.meta.env.VITE_API_URL + `/employment/?socCode=${socCode}`)
}