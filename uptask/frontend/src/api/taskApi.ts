import {isAxiosError} from "axios"
import api from "@/lib/axios"
import {Project, Task, TaskFormData, TaskSchema} from "@/types/index"

type TaskApiType = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export const createTask = async ({formData, projectId}: Pick<TaskApiType, 'formData' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getTaskById = async ({taskId, projectId}: Pick<TaskApiType, 'taskId' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.get(url)
        const response = TaskSchema.safeParse(data)
        if (response.success)
            return response.data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateTask = async ({formData, taskId, projectId}: Pick<TaskApiType, 'formData' | 'taskId' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteTask = async ({taskId, projectId}: Pick<TaskApiType, 'taskId' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateTaskStatus = async ({status, taskId, projectId}: Pick<TaskApiType, 'status' | 'taskId' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, {status})
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}