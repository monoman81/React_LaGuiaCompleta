import {Router} from "express"
import {body} from "express-validator"
import {AuthController} from "../controllers/AuthController"
import {inputErrors} from "../middleware/validation"

const router = Router()

router.get('/', (req, res) => {
    res.send('Desde /api/auth')
})

router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre del usuario no puede ser vacio'),
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').isLength({min: 8}).withMessage('El password debe de ser minimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if (value !== req.body.password)
            throw new Error('La confirmacion de password no coincide.')
        return true
    }),
    inputErrors,
    AuthController.createAccount
)

export default router