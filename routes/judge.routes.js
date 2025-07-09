import {Router} from "express";
import * as judgeControllers from "../controllers/judge.controllers.js";

const router = Router();

router.post("/", judgeControllers.enviarCodigo);

export default router;