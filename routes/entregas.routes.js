import {Router} from "express";
import * as entregaControllers from "../controllers/entrega.controllers.js";

const router = Router();

router.post("/", entregaControllers.agregarEntrega);
router.get("/:id_prueba/:id_curso", entregaControllers.obtenerEntregasPorPrueba);

export default router;