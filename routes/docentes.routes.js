import {Router} from "express";
import * as docentesController from "../controllers/docentes.controllers.js";

const router = Router();

router.get("/:email", docentesController.obtenerDocente);

export default router;