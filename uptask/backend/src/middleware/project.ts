import type {Request, Response, NextFunction} from "express"
import Project, {IProject} from "../models/Project"

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export const projectExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId, undefined, undefined)
        if (!project) {
            const error = new Error('Proyecto no existe')
            return res.status(400).json({ error: error.message })
        }
        req.project = project
        next()
    }
    catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' })
    }
}