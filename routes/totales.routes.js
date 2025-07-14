import {Router} from "express";
import { obtenerTotalEntregas } from "../controllers/entrega.controllers.js";
import { obtenerTotalEstudiantes } from "../controllers/estudiantes.controller.js";

const router = Router();

router.get("/entregas/:id_prueba/:id_curso", obtenerTotalEntregas);
router.get("/estudiantes/:id_curso", obtenerTotalEstudiantes);

export default router;