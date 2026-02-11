import type {Request, Response} from "express"
import User from "../models/User"
import Token from "../models/Token"
import {checkPassword, hashPassword} from "../utils/auth"
import {generateToken} from "../utils/token"
import {AuthEmail} from "../emails/AuthEmail"
import {generateJWT} from "../utils/jwt"

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body

            const userExists = await User.findOne({email}, undefined, undefined)
            if (userExists) {
                const error = new Error('El usuario ya esta registrado.')
                return res.status(409).json({error: error.message})
            }
            const user = new User(req.body)
            user.password = await hashPassword(password)
            //Token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            //Email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await Promise.allSettled([user.save(), token.save()])

            res.send('Cuenta creada, revisa tu email para confirmarla.')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({token})
            if (!tokenExists) {
                const error = new Error('Token no valido')
                return res.status(404).json({error: error.message})
            }
            const user = await User.findById(tokenExists.user)
            user.confirmed = true
            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.send('Cuenta confirmada correctamente')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({email})
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }
            if (!user.confirmed) {
                const token = new Token()
                token.user = user._id
                token.token = generateToken()
                await token.save()
                //Email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un email de confirmacion')
                return res.status(401).json({error: error.message})
            }
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error('El password no es correcto')
                return res.status(401).json({error: error.message})
            }
            const token = generateJWT({id: user._id})
            return res.send(token)

        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const user = await User.findOne({email}, undefined, undefined)
            if (!user) {
                const error = new Error('El usuario no esta registrado.')
                return res.status(404).json({error: error.message})
            }

            if (user.confirmed) {
                const error = new Error('El usuario ya esta confirmado.')
                return res.status(403).json({error: error.message})
            }

            //Token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            //Email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await token.save()

            res.send('Nuevo token enviado, revisa tu email.')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const user = await User.findOne({email}, undefined, undefined)
            if (!user) {
                const error = new Error('El usuario no esta registrado.')
                return res.status(404).json({error: error.message})
            }

            //Token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            //Email
            AuthEmail.sendPasswordResetTokenEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            await token.save()

            res.send('Revisa tu email para instrucciones.')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({token})
            if (!tokenExists) {
                const error = new Error('Token no valido')
                return res.status(404).json({error: error.message})
            }
            res.send('Token valido, ingresa tu nuevo password.')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params
            const tokenExists = await Token.findOne({token})
            if (!tokenExists) {
                const error = new Error('Token no valido')
                return res.status(404).json({error: error.message})
            }

            const user = await User.findById(tokenExists.user, undefined, undefined)
            user.password = await hashPassword(req.body.password)

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])

            res.send('El password se modifico correctamente.')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static user = async(req: Request, res: Response) => {
        return res.json(req.user)
    }

    static updateProfile = async(req: Request, res: Response) => {
        try {
            const { name, email } = req.body

            const userExists = await User.findOne({email}, undefined, undefined)
            if (userExists && userExists._id.toString() !== req.user._id.toString()) {
                const error = new Error('El email ya esta registrado')
                return res.status(409).json({error: error.message})
            }

            req.user.name = name
            req.user.email = email
            await req.user.save()
            res.send('Perfil actualizado correctamente')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static changePassword = async(req: Request, res: Response) => {
        try {
            const { current_password, password, password_confirmation } = req.body

            const user = await User.findById(req.user._id, undefined, undefined)
            const isPasswordCorrect = await checkPassword(current_password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error('El password actual es incorrecto')
                return res.status(401).json({error: error.message})
            }
            user.password = await hashPassword(password)
            await user.save()
            res.send('Password modificado correctamente')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

    static checkPassword = async(req: Request, res: Response) => {
        try {
            const { password } = req.body
            const user = await User.findById(req.user._id, undefined, undefined)
            const isPasswordCorrect = await checkPassword(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error('El password es incorrecto')
                return res.status(401).json({error: error.message})
            }
            res.send('Password correcto')
        }
        catch (error) {
            res.status(500).json({error: 'Error interno del servidor.'})
        }
    }

}