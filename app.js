import express from "express";
import dotenv from "dotenv";
import judge from "./routes/judge.routes.js";
import auth from "./routes/auth.routes.js";
import admin from "./routes/admin.routes.js";
import prueba from "./routes/prueba.routes.js";
import entrega from "./routes/entregas.routes.js";
import cursos from "./routes/cursos.routes.js";
import totales from "./routes/totales.routes.js";
import estudiantes from "./routes/estudiantes.routes.js";
import docentes from "./routes/docentes.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin:"https://idgye-frontend.onrender.com"
}));

app.use(express.json());

app.use("/api/judge", judge);
app.use("/api/auth", auth);
app.use("/api/admin/auth", admin);
app.use("/api/pruebas", prueba);
app.use("/api/entregas", entrega);
app.use("/api/cursos", cursos);
app.use("/api/totales", totales);
app.use("/api/estudiantes", estudiantes);
app.use("/api/docentes", docentes);

app.listen(PORT, ()=>console.log(`Escuchando en puerto ${PORT}`));