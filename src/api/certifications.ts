import axios from 'axios'
import { type ExternalLink } from '@/api/common'
import { auth0 } from '@/api/auth'

export interface CertificationsWrapper {
    news: Certification[]
}

export interface Certification {
    id: string,
    socCodes: string[],
    title: string,
    description: string,
    source: string,
    externalLink: ExternalLink
}

export const fetchCertifications = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<CertificationsWrapper>(import.meta.env.VITE_API_URL + `/certifications/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}