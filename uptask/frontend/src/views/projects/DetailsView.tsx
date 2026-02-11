import {useMemo} from "react"
import {Link, Navigate, useNavigate, useParams} from "react-router-dom"
import {useQuery} from "@tanstack/react-query"
import {getFullProjectById} from "@/api/projectApi"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TasksList from "@/components/tasks/TasksList"
import EditTaskData from "@/components/tasks/EditTaskData"
import ViewTaskModal from "@/components/tasks/ViewTaskModal"
import {useAuth} from "@/hooks/useAuth";
import {isManager} from "@/utils/policies"


export default function DetailsView() {

    const navigate= useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const {data: user, isLoading: authLoading} = useAuth()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['viewProject', projectId],
        queryFn: () => getFullProjectById(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading || authLoading) return 'Cargando...'
    if (isError) return <Navigate to='/404' />

    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.clientName}</p>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        className="bg-purple-400 hover:bg-purple-500 cursor-pointer px-10 py-3 text-white text-xl font-bold transition-colors"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >
                        Agregar Tarea
                    </button>
                    <Link to={'team'}
                          className="bg-purple-600 hover:bg-purple-700 cursor-pointer px-10 py-3 text-white text-xl font-bold transition-colors">
                        Colaboradores
                    </Link>
                </nav>
            )}

            <TasksList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <ViewTaskModal />
        </>
    )
}
