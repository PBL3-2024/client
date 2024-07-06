import axios from 'axios'
import { auth0 } from '@/api/auth'

export interface Profile {
    id?: string,
    name?: string,
    email?: string,
    postalCode?: string,
    currentSocCode?: string,
    goalSocCode?: string,
    termsOfUseConsent?: boolean
}

export const fetchProfile = async function() {
    const token = await auth0.getAccessTokenSilently();
    return axios.get<Profile>(import.meta.env.VITE_API_URL + `/profile/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateProfile = async function(profile: Profile) {
    const token = await auth0.getAccessTokenSilently();
    return axios.post<Profile>(import.meta.env.VITE_API_URL + `/profile/`, profile, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}