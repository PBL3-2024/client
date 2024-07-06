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

export const pushClickData = async function(clickData: ClickData) {
    const token = await auth0.getAccessTokenSilently();
    return axios.post<void>(import.meta.env.VITE_API_URL + `/analytics/`, clickData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}