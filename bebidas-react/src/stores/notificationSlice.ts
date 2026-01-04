import type { StateCreator } from "zustand/vanilla"
import type { FavoritesSliceType } from "./favoritesSlice";

type NotificationType = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {
    notification: NotificationType
    showNotification: (notification: Pick<NotificationType, 'text' | 'error'>) => void
    close: () => void
}

export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: notification => {
        set({
            notification: {
                text: notification.text,
                error: notification.error,
                show: true
            }
        })
        setTimeout(() => {
            get().close()
        }, 5000)
    },
    close: () => {
        set({
            notification : {
                text: '',
                error: false,
                show: false
            }
        })
    }
})

