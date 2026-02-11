import {Request, Response} from "express"
import Project, {IProject} from "../models/Project"
import {QueryFilter, Types} from "mongoose";

export class ProjectController {

    static createProject = async (req: Request, res: Response)=> {
        try {
            const project = new Project(req.body)
            project.manager = req.user._id
            req.user.projects.push(new Types.ObjectId(project.id))
            await Promise.allSettled([project.save(), req.user.save()])
            return res.status(200).send('Proyecto creado correctamente')
        }
        catch (error) {
            console.log(error)
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getAllProjects = async (req: Request, res: Response)=> {
        try {
            const query: QueryFilter<IProject> = {
                $or: [
                    {manager: {$in: req.user._id}},
                    {team: {$in: [req.user._id]}}
                ]
            }
            const projects = await Project.find(query, undefined, undefined)
            return res.json(projects)
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getProjectById = async (req: Request, res: Response)=> {
        try {
            const { projectId } = req.params
            const project = await Project.findById(projectId, undefined, undefined).populate('tasks')
            if (!project) {
                const error = new Error('Projecto no encontrado')
                return res.status(400).json({ error: error.message })
            }
            if (project.manager.toString() !== req.user._id.toString() && !project.team.includes(req.user._id)) {
                const error = new Error('Accion no valida')
                return res.status(403).json({ error: error.message })
            }
            return res.json(project)
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static updateProject = async (req: Request, res: Response)=> {
        try {
            // const { projectId } = req.params
            // const project = await Project.findById(projectId, undefined, undefined)
            // if (!project) {
            //     const error = new Error('Projecto no encontrado')
            //     return res.status(400).json({ error: error.message })
            // }
            // if (project.manager.toString() !== req.user._id.toString()) {
            //     const error = new Error('Accion no valida')
            //     return res.status(403).json({ error: error.message })
            // }
            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description
            await req.project.save()
            return res.send('Proyecto modificado exitosamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static deleteProject = async (req: Request, res: Response)=> {
        try {
            // const { projectId } = req.params
            // const project = await Project.findById(projectId, undefined, undefined)
            // if (!project) {
            //     const error = new Error('Projecto no encontrado')
            //     return res.status(400).json({ error: error.message })
            // }
            // if (project.manager.toString() !== req.user._id.toString()) {
            //     const error = new Error('Accion no valida')
            //     return res.status(403).json({ error: error.message })
            // }
            await req.project.deleteOne()
            return res.send('Proyecto eliminado exitosamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

}