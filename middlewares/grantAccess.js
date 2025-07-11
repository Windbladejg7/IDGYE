import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as docenteDAO from "../dao/docenteDAO.js";

dotenv.config();

const SECRETO = process.env.JWT_SECRET;

export function grant(req, res, next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({error: "Ruta necesita autenticación"});
    }
    const user = jwt.verify(token, SECRETO);
    req.usuario = user;
    next();
}

export async function onlyAdmin(req, res, next){
    const usuario = req.usuario;
    const permitido = await docenteDAO.buscarPorEmail(usuario.email);
    if(!permitido){
        return res.status(401).json({error: "Ruta administrativa"});
    }
    res.json({mensaje: "Acceso concedido"});
    next();
}