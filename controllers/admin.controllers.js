import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as docenteDAO from "../dao/docenteDAO.js";
import {Docente} from "../modelo/Docente.js";

dotenv.config();

const SECRETO = process.env.JWT_SECRET;

export async function register(req, res){
    const datos = req.body;
    const docente = await Docente.crearDocente({
        nombre: datos.nombre,
        email: datos.email,
        password: datos.password
    });
    const respuesta = await docenteDAO.buscarPorEmail(docente.email);
    if(respuesta){
        return res.status(400).json({error: "Ya existente"});
    }
    docenteDAO.insertarDocente(docente);
    res.json({mensaje:"Docente creado"});
}

export async function login(req, res){
    const {email, password} = req.body;
    const docente = await docenteDAO.buscarPorEmail(email);
    if(!docente){
        return res.status(404).json({error:"Usuario no encontrado"});
    }
    const correcta = await docente.verificarPassword(password);
    if(!correcta){
        return res.status(404).json({error:"Contraseña incorrecta"});
    }
    const token = jwt.sign({email:docente.email, id:docente.id_docente}, SECRETO);
    res.json({token});
}