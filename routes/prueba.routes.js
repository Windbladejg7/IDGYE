import {Router} from "express";
import * as pruebaControllers from "../controllers/prueba.controllers.js";
import * as accessControl from "../middlewares/grantAccess.js";

const router = Router();

router.post("/", accessControl.grant, accessControl.onlyAdmin, pruebaControllers.agregarPrueba);
router.get("/:curso", accessControl.grant, pruebaControllers.obtenerPruebasXCurso);
router.get("/", accessControl.grant, pruebaControllers.pruebasPendientes);

export default router;