import express from "express"
import cors from 'cors';
import tasksRoutes from "./routes/tasks.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import { authenticate } from './Middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 8800;

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());//for security, authentication
app.use(express.json());
app.use('/api/tasks', tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
//app.use("")

app.listen(PORT, ()=>{ //this port number must be the listening one
    console.log(`Server running on http://localhost:${PORT}`);
});