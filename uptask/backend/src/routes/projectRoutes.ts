import {Router} from "express"
import {body, param} from "express-validator"
import {ProjectController} from "../controllers/ProjectController"
import {inputErrors} from "../middleware/validation"
import {TaskController} from "../controllers/TaskController"
import {projectExists} from "../middleware/project"
import {hasAuthorization, taskBelongsToProject, taskExists} from "../middleware/task"
import {authenticate} from "../middleware/auth"
import {TeamMemberController} from "../controllers/TeamMemberController"
import {NoteController} from "../controllers/NoteController"

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

router.param('projectId', projectExists)

router.put('/:projectId/update',
    param('projectId').isMongoId().withMessage('Id no valido'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    inputErrors,
    hasAuthorization,
    ProjectController.updateProject
)

router.delete('/:projectId/delete',
    param('projectId').isMongoId().withMessage('Id no valido'),
    inputErrors,
    hasAuthorization,
    ProjectController.deleteProject
)

//Task's routes


router.param('id', taskExists)
router.param('id', taskBelongsToProject)

router.post('/:projectId/tasks',
    hasAuthorization,
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
    hasAuthorization,
    param('id').isMongoId().withMessage('Id no valido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion es obligatoria'),
    inputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:id',
    hasAuthorization,
    param('id').isMongoId().withMessage('Id no valido'),
    inputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:id/status',
    hasAuthorization,
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

router.delete('/:projectId/team/:userId',
    param('userId').isMongoId().withMessage('Id de usuario no valido'),
    inputErrors,
    TeamMemberController.removeMemberById
)

router.get('/:projectId/team', TeamMemberController.getProjectTeam)

// Note's Routes
router.post('/:projectId/tasks/:id/notes',
    body('content').notEmpty().withMessage('El contenido de la nota no puede ser vacio'),
    inputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:id/notes', NoteController.getNotes)

router.get('/:projectId/tasks/:id/notes/:noteId',
    param('noteId').isMongoId().withMessage('Id no valido'),
    inputErrors,
    NoteController.getNoteById
)

router.put('/:projectId/tasks/:id/notes/:noteId',
    param('noteId').isMongoId().withMessage('Id no valido'),
    body('content').notEmpty().withMessage('El contenido de la nota no puede ser vacio'),
    inputErrors,
    NoteController.updateNote
)

router.delete('/:projectId/tasks/:id/notes/:noteId',
    param('noteId').isMongoId().withMessage('Id no valido'),
    inputErrors,
    NoteController.deleteNote
)

/////////////////////
export default router