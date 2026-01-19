import type {Request, Response, NextFunction} from "express"
import Task, {ITask} from "../models/Task"

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export const taskExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id, undefined, undefined)
        if (!task) {
            const error = new Error('Tarea no existe')
            return res.status(404).json({ error: error.message })
        }
        req.task = task
        next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export const taskBelongsToProject = async (req: Request, res: Response, next: NextFunction) => {
    if (req.task.project.toString() !== req.project._id.toString()) {
        const error = new Error('Datos no validos')
        return res.status(400).json({ error: error.message })
    }
    next()
}