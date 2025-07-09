import express from "express";
import dotenv from "dotenv";
import judge from "./routes/judge.routes.js";
import auth from "./routes/auth.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());

app.use("/api/judge", judge);
app.use("/api/auth", auth);

app.listen(PORT, ()=>console.log(`Escuchando en puerto ${PORT}`));