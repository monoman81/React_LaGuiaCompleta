import {Request, Response} from "express"
import {Types} from "mongoose"
import Task from "../models/Task"

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = new Types.ObjectId(req.project._id)
            req.project.tasks.push(new Types.ObjectId(task.id))
            await Promise.allSettled([task.save(), req.project.save()])
            return res.send('Tarea creada correctamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project._id}, undefined, undefined).populate('project')
            return res.json(tasks)
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            return res.json(req.task)
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            return res.send('Tarea actualizada correctamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task._id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            return res.send('Tarea eliminada correctamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            req.task.status = req.body.status
            await req.task.save()
            return res.send('Status actualizado correctamente')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

}