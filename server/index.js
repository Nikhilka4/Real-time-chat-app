import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import AuthRouter from "./routes/AuthRoutes.js";

const app = express();
const port = process.env.PORT ;
connectDB()

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST","PUT", "DELETE","PATCH"],
    credentials: true,
}))


app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', AuthRouter)


app.listen(port, () => console.log(`Server running on port ${port} 😎`));
