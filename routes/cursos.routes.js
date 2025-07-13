import {Router} from "express";
import * as cursosControllers from "../controllers/cursos.controllers.js";
import * as accessControl from "../middlewares/grantAccess.js";

const router = Router();

router.get("/", accessControl.grant, accessControl.onlyAdmin, cursosControllers.obtenerCursos);

export default router;