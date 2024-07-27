import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected 👍")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB