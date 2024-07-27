import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password should be minimum 6 characters long"]
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: Number,
        required: false
    },
    profileSetup :{
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const User = model('User', userSchema);

export default User