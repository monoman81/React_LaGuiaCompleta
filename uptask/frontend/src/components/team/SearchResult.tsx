import type {TeamMember} from "@/types/index"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {addMemberById} from "@/api/teamApi"
import {toast} from "react-toastify"
import {useNavigate, useParams} from "react-router-dom"

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addMemberById,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleClick = () => {
        mutate({
            projectId,
            userId: user._id
        })
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button onClick={handleClick}
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer transition-colors"
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
