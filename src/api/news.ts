import axios from 'axios'
import { type ExternalLink } from '@/api/common'
import { auth0 } from '@/api/auth'

export interface NewsWrapper {
    news: News[]
}

export interface News {
    id: string,
    socCodes: string[],
    title: string,
    description: string,
    categories: string[],
    source: string,
    published: string,
    externalLink: ExternalLink
}

export const fetchNews = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<NewsWrapper>(import.meta.env.VITE_API_URL + `/news/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}