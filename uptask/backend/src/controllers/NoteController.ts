import type {Request, Response } from "express"
import Note, {INote} from "../models/Note"
import {Types} from "mongoose"

type NoteParams = {
    noteId: Types.ObjectId
}

export class NoteController {

    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        try {
            const note = new Note(req.body)
            note.task = new Types.ObjectId(req.task._id)
            note.createdBy = new Types.ObjectId(req.user._id)
            req.task.notes.push(note._id)
            await Promise.allSettled([note.save(), req.task.save()])
            return res.send('Nota creada correctamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({task: req.task._id}, undefined, undefined)
                .populate({path: 'createdBy', select: '_id name email'})
            return res.json(notes)
        }
        catch (error) {
            console.log(error.message)
            return res.status(500).send('Error interno del servidor')
        }
    }

    static getNoteById = async (req: Request<NoteParams>, res: Response) => {
        try {
            const { noteId } = req.params
            const note = await Note.findById(noteId, undefined, undefined)
                .populate({path: 'createdBy', select: '_id name email'})
            return res.json(note)
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static updateNote = async (req: Request<NoteParams, {}, INote>, res: Response) => {
        try {
            const { noteId } = req.params
            const note = await Note.findById(noteId, undefined, undefined)
            note.content = req.body.content
            await note.save()
            return res.send('Nota actualizada correctamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        try {
            const { noteId } = req.params
            const note = await Note.findById(noteId, undefined, undefined)
            if (!note) {
                const error = new Error('Nota no encontrada.')
                return res.status(404).json({error: error.message})
            }
            if (note.createdBy.toString() !== req.user._id.toString()) {
                const error = new Error('Accion no valida.')
                return res.status(409).json({error: error.message})
            }
            req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())
            await Promise.allSettled([note.deleteOne(), req.task.save()])
            return res.send('Nota eliminada correctamente.')
        }
        catch (error) {
            return res.status(500).send('Error interno del servidor')
        }
    }

}