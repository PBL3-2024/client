import axios from 'axios'
import { auth0 } from '@/api/auth'

export interface ClickData {
    timestamp: number,
    elementId: string,
    elementType: string,
    userId?: string,
    userPostalCode?: string,
    userCurrentOccupation?: string,
    userGoalOccupation?: string
}

export interface Report {
    charts: any[]
}

export const pushClickData = async function(clickData: ClickData) {
    const token = await auth0.getAccessTokenSilently();
    return axios.post<void>(import.meta.env.VITE_API_URL + `/analytics/`, clickData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getUserCurrentOccupationReport = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Report>(import.meta.env.VITE_API_URL + `/analytics/currentOccupation?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getUserGoalOccupationReport = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Report>(import.meta.env.VITE_API_URL + `/analytics/goalOccupation?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getCertificationEngagementReport = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Report>(import.meta.env.VITE_API_URL + `/analytics/certificationEngagement?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getLearningMaterialEngagementReport = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Report>(import.meta.env.VITE_API_URL + `/analytics/learningMaterialEngagement?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getNewsEngagementReport = async function(socCode: string) {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Report>(import.meta.env.VITE_API_URL + `/analytics/newsEngagement?socCode=${socCode}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}