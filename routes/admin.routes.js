import {Router} from "express";
import * as adminControllers from "../controllers/admin.controllers.js";

const router = Router();

router.post("/register", adminControllers.register);
router.post("/login", adminControllers.login);

export default router;