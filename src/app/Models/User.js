import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: {type: String, required: false},
        image: { type: String, required: false }
    }, { timestamps: true }
);


const User = mongoose.model.User || mongoose.model('User', UserSchema)

export default User;