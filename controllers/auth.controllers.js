import jwt from "jsonwebtoken";
import { Estudiante } from "../modelo/Estudiante.js";
import * as estudianteDAO from "../dao/estudianteDAO.js";
import dotenv from "dotenv";

dotenv.config();

const SECRETO = process.env.JWT_SECRET;

export async function register(req, res){
    const obj = req.body;
    const estudiante = await Estudiante.crearEstudiante({
        nombre: obj.nombre, 
        email: obj.email, 
        password: obj.password, 
        curso: obj.curso
    });
    if(!estudianteDAO.buscarPorEmail(estudiante.email)){
        return res.status(400).json({error:"Ya existente"});
    }
    estudianteDAO.insertarEstudiante(estudiante);
    res.json({mensaje:"Usuario creado exitosamente"});
}

export async function login(req, res){
    const {email, password} = req.body;
    const estudiante = await estudianteDAO.buscarPorEmail(email);
    if(!estudiante){
        return res.status(404).json({error:"Usuario no encontrado"});
    }
    const correcta = await estudiante.verificarPassword(password);
    if(!correcta){
        return res.status(401).json({error:"Contraseña incorrecta"});
    }
    const token = jwt.sign({email:estudiante.email, id:estudiante.id_estudiante}, SECRETO);
    res.json({token});
}