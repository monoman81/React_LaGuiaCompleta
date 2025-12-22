import { useContext } from "react"
import { ActivityContext } from "../context/ActivitiyContext"

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if (!context)
        throw new Error('useActivity debe de ser usado en un ActivityProvider')
    return context
}