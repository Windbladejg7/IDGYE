import {Router} from "express";
import * as entregaControllers from "../controllers/entrega.controllers.js";
import * as accessControl from "../middlewares/grantAccess.js";

const router = Router();

router.post("/", accessControl.grant, entregaControllers.agregarEntrega);
router.get("/:id_prueba/:id_curso", accessControl.grant, accessControl.onlyAdmin, entregaControllers.obtenerEntregasPorPrueba);

export default router;