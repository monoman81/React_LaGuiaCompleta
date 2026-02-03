import {Router} from "express"
import {body, param} from "express-validator"
import {ProjectController} from "../controllers/ProjectController"
import {inputErrors} from "../middleware/validation"
import {TaskController} from "../controllers/TaskController"
import {projectExists} from "../middleware/project"
import {taskBelongsToProject, taskExists} from "../middleware/task"
import {authenticate} from "../middleware/auth"
import {TeamMemberController} from "../controllers/TeamMemberController"

const router = Router()

router.use(authenticate)

//Project's Routes
router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    inputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:projectId',
    param('projectId').isMongoId().withMessage('Id no valido'),
    inputErrors,
    ProjectController.getProjectById
)

router.put('/:projectId/update',
    param('projectId').isMongoId().withMessage('Id no valido'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    inputErrors,
    ProjectController.updateProject
)

router.delete('/:projectId/delete',
    param('projectId').isMongoId().withMessage('Id no valido'),
    inputErrors,
    ProjectController.deleteProject
)

//Task's routes

router.param('projectId', projectExists)
router.param('id', taskExists)
router.param('id', taskBelongsToProject)

router.post('/:projectId/tasks',
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    inputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getAllTasks
)

router.get('/:projectId/tasks/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    inputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    inputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    inputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:id/status',
    param('id').isMongoId().withMessage('Id no valido'),
    body('status').notEmpty().withMessage('Status es obligatorio'),
    inputErrors,
    TaskController.updateTaskStatus
)
// Teams
router.post('/:projectId/team/find',
    body('email').isEmail().toLowerCase().withMessage('Email no valido'),
    inputErrors,
    TeamMemberController.findMemberByEmail
)

router.post('/:projectId/team',
    body('id').isMongoId().withMessage('Id no valido'),
    inputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team',
    body('id').isMongoId().withMessage('Id no valido'),
    inputErrors,
    TeamMemberController.removeMemberById
)

router.get('/:projectId/team', TeamMemberController.getProjectTeam)

/////////////////////
export default router