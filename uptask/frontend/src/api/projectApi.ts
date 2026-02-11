import {isAxiosError} from "axios"
import type {Project, ProjectFormData} from "@/types/index"
import api from "@/lib/axios"
import {DashboardProjectsSchema, EditProjecSchema, ProjectSchema} from "@/types/index"

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export const createProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await api.post<string>('/projects', formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getProjects = async () => {

    try {
        const { data } = await api.get('/projects')
        const response = DashboardProjectsSchema.safeParse(data)
        if (response.success)
            return response.data
        return response.error.message
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getProjectById = async (id: Project['_id']) => {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = EditProjecSchema.safeParse(data)
        if (response.success)
            return response.data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getFullProjectById = async (id: Project['_id']) => {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = ProjectSchema.safeParse(data)
        if (response.success)
            return response.data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProject = async ({formData, projectId}: ProjectAPIType) => {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}/update`, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteProject = async (projectId: Project['_id']) => {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/delete`)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}