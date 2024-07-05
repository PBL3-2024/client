import axios from 'axios'
import { type ExternalLink } from '@/api/common'

export interface JobPostingWrapper {
    jobPosting: JobPosting[]
}

export interface JobPosting {
    id: string,
    title: string,
    description: string,
    company: string,
    salaryRange: string,
    location: string,
    deadline: string,
    externalLink: ExternalLink[],
    jobSource: string
}

export const fetchJobs = async function(socCode: string) {
    return axios.get<JobPostingWrapper>(import.meta.env.VITE_API_URL + `/jobs/?socCode=${socCode}`)
}