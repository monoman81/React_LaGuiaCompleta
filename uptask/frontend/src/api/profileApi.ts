import {isAxiosError} from "axios"
import type {ChangePasswordForm, UserProfileForm} from "@/types/index"
import api from "@/lib/axios"

export async function updateProfile(formData: UserProfileForm) {
    try {
        const url = `/auth/profile`
        const { data } = await api.put<string>(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}

export async function changePassword(formData: ChangePasswordForm) {
    try {
        const url = `/auth/change-password`
        const { data } = await api.post<string>(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.error)
    }
}