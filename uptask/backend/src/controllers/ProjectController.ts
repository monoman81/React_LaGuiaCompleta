import {Request, Response} from "express"
import Project from "../models/Project"

export class ProjectController {

    static createProject = async (req: Request, res: Response)=> {
        try {
            const project = new Project(req.body)
            await project.save()
            return res.status(200).send('Proyecto creado correctamente')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getAllProjects = async (req: Request, res: Response)=> {
        try {
            const projects = await Project.find({}, undefined, undefined)
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
            return res.json(project)
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static updateProject = async (req: Request, res: Response)=> {
        try {
            const { projectId } = req.params
            const project = await Project.findById(projectId, undefined, undefined)
            if (!project) {
                const error = new Error('Projecto no encontrado')
                return res.status(400).json({ error: error.message })
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            return res.send('Proyecto modificado exitosamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static deleteProject = async (req: Request, res: Response)=> {
        try {
            const { projectId } = req.params
            const project = await Project.findById(projectId, undefined, undefined)
            if (!project) {
                const error = new Error('Projecto no encontrado')
                return res.status(400).json({ error: error.message })
            }
            await project.deleteOne()
            return res.send('Proyecto eliminado exitosamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

}