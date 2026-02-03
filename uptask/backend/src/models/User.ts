import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose"
import {IProject} from "./Project";

export interface IUser extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
    projects: PopulatedDoc<IProject & Document>[]
}

const UserSchema: Schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    projects: [
        {
            type: Types.ObjectId,
            ref: 'Project'
        }
    ]
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User

