import mongoose, {ObjectId} from "mongoose";

export interface IUser {
    username: string,
    password: string,
    graphs?: {
        type: ObjectId,
        ref: string
    }[]
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 20,
    },
    password: {
        type: String,
        required: true,
    },
    graphs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Graph"
    }]
})

export const User = mongoose.model("User", userSchema)
