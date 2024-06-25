import axios from 'axios'
import { type ExternalLink } from '@/api/common'

export interface NewsWrapper {
    news: News[]
}

export interface News {
    id: string,
    socCode: string,
    title: string,
    description: string,
    categories: string[],
    source: string,
    published: string,
    externalLink: ExternalLink
}

export const fetchNews = async function(socCode: string) {
    return axios.get<NewsWrapper>(import.meta.env.VITE_API_URL + `/news/?socCode=${socCode}`)
}