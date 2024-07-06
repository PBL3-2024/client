import axios from 'axios'
import { type ExternalLink } from '@/api/common'
import { auth0 } from '@/api/auth'

export interface LearningWrapper {
    learningMaterial: Learning[]
}

export interface Learning {
    id: string,
    socCode: string[],
    title: string,
    description: string,
    source: string,
    type: string,
    externalLink: ExternalLink[]
}

export const fetchLearningMaterial = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<LearningWrapper>(import.meta.env.VITE_API_URL + `/learning/?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}