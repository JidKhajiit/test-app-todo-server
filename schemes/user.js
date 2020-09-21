import mongoose from "mongoose";


const { Schema } = mongoose;
const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});

export default mongoose.model("User", userSchema);