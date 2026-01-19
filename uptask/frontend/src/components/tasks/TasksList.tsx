import type {Task} from "@/types/index"
import TaskCard from "@/components/tasks/TaskCard"
import {statusTranslations} from "@/locales/es"

type TasksListProps = {
    tasks: Task[]
}

type GroupedTask = {
    [key: string]: Task[]
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

export default function TasksList({tasks}: TasksListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-xl font-light border-slate-300 bg-white p-3 border-t-8 ${statusColor[status]}`}>
                            {statusTranslations[status]}
                        </h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
