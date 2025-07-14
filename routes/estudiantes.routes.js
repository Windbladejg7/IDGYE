import {Router} from "express";
import * as estudiantesControllers from "../controllers/estudiantes.controller.js";

const router = Router();

router.get("/:email", estudiantesControllers.obtenerUsuario);

export default router;