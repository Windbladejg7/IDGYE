import express from "express";
import dotenv from "dotenv";
import judge from "./routes/judge.routes.js";
import auth from "./routes/auth.routes.js";
import admin from "./routes/admin.routes.js";
import prueba from "./routes/prueba.routes.js";
import entrega from "./routes/entregas.routes.js";
import cursos from "./routes/cursos.routes.js";
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
app.use("/api/admin/auth", admin);
app.use("/api/pruebas", prueba);
app.use("/api/entregas", entrega);
app.use("/api/cursos", cursos);

app.listen(PORT, ()=>console.log(`Escuchando en puerto ${PORT}`));