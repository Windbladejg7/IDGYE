import {Router} from "express";
import * as pruebaControllers from "../controllers/prueba.controllers.js";

const router = Router();

router.post("/", pruebaControllers.agregarPrueba);
router.get("/:curso", pruebaControllers.obtenerPruebasXCurso);

export default router;