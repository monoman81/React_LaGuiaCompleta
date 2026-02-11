import { z } from "zod"

//Auth & Users
const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string,
    current_password: z.string()
})
type Auth = z.infer<typeof AuthSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type ChangePasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>

//Users
export const UserSchema = AuthSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof UserSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

//Notes
export const NoteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: UserSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof NoteSchema>
export type NoteFormData = Pick<Note, 'content'>

//Tasks
export const TaskStatusSchema = z.enum([
    'pending',
    'onHold',
    'inProgress',
    'underReview',
    'completed'
])
export type TaskStatusType = z.infer<typeof TaskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: UserSchema,
        status: TaskStatusSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string(),
    notes: z.array(NoteSchema.extend({
        createdBy: UserSchema
    }))
})

export type Task = z.infer<typeof TaskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

export const TaskProjectSchema = TaskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true
})

export type TaskProject = z.infer<typeof TaskProjectSchema>

//Projects
export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(UserSchema.pick({_id: true})),
    tasks: z.array(TaskProjectSchema),
    team: z.array(z.string(UserSchema.pick({_id: true})))
})

export const DashboardProjectsSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export const EditProjecSchema = ProjectSchema.pick({
    projectName: true,
    clientName: true,
    description: true
})

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = z.infer<typeof EditProjecSchema>
//export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

/** Team **/
const TeamMemberSchema = UserSchema.pick({
    name: true,
    email: true,
    _id: true
})

export const TeamMembersSchema = z.array(TeamMemberSchema)

export type TeamMember = z.infer<typeof TeamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>
