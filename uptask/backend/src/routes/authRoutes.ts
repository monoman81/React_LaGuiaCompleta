import {Router} from "express"
import {body, param} from "express-validator"
import {AuthController} from "../controllers/AuthController"
import {inputErrors} from "../middleware/validation"
import {authenticate} from "../middleware/auth";

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

router.post('/confirm-account',
    body('token').notEmpty().withMessage('El token no puede ser vacio'),
    inputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('El password no puede ir vacio'),
    inputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email').isEmail().withMessage('El email no es valido'),
    inputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email').isEmail().withMessage('El email no es valido'),
    inputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token').notEmpty().withMessage('El token no puede ser vacio'),
    inputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token no valido'),
    body('password').isLength({min: 8}).withMessage('El password debe de ser minimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if (value !== req.body.password)
            throw new Error('La confirmacion de password no coincide.')
        return true
    }),
    inputErrors,
    AuthController.updatePasswordWithToken
)

router.get('/user', authenticate, AuthController.user)

export default router