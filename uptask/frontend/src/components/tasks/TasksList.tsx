import type {Project, TaskProject, TaskStatusType} from "@/types/index"
import {DndContext, DragEndEvent} from "@dnd-kit/core"
import TaskCard from "@/components/tasks/TaskCard"
import {statusTranslations} from "@/locales/es"
import DropTask from "@/components/tasks/DropTask"
import {useNavigate, useParams} from "react-router-dom"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {updateTaskStatus} from "@/api/taskApi"
import {toast} from "react-toastify"

type TasksListProps = {
    tasks: TaskProject[]
    canEdit: boolean
}

type GroupedTask = {
    [key: string]: TaskProject[]
}

const initialStatusGroup: GroupedTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusColor: {[key: string]: string} = {
    pending: 'border-t-red-500',
    onHold: 'border-t-slate-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-ambar-500',
    completed: 'border-t-green-500'
}

export default function TasksList({tasks, canEdit}: TasksListProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["viewProject", projectId]})
            toast.success(data)
        }
    })

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e
        if (over && over.id) {
            const taskId = active.id
            const status = over.id as TaskStatusType
            const data = {
                taskId,
                projectId,
                status
            }
            mutate(data)
            queryClient.setQueryData(["viewProject", projectId], (prevData: Project) => {
                const updatedTasks = prevData.tasks.map((task: TaskProject) => {
                    if (task._id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })
                return {
                    ...prevData,
                    tasks: updatedTasks
                }
            })
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3 className={`capitalize text-xl font-light border-slate-300 bg-white p-3 border-t-8 ${statusColor[status]}`}>
                                {statusTranslations[status]}
                            </h3>
                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}
