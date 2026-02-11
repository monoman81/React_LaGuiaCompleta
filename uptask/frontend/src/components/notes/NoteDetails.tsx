import type {Note} from "@/types/index"
import {formatDate} from "@/utils/utils.ts"
import {useAuth} from "@/hooks/useAuth.ts"
import {useMemo} from "react"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteNote} from "@/api/noteApi.ts";
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";

type NoteDetailsProps = {
    note: Note
}

export default function NoteDetails({note}: NoteDetailsProps) {

    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const {data, isLoading} = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
        }
    })

    if (isLoading) return 'Cargando...'

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>{note.content} por: <span className="font-bold">{note.createdBy.name}</span></p>
                <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
            </div>
            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                    onClick={() => mutate({projectId, taskId, noteId: note._id})}
                >
                    Eliminar
                </button>
            )}
        </div>
    )
}
