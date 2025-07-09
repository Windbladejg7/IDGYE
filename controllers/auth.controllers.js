import jwt from "jsonwebtoken";
import { Estudiante } from "../modelo/Estudiante.js";
import * as estudianteDAO from "../dao/estudianteDAO.js";

export async function register(req, res){
    const obj = req.body;
    const estudiante = await Estudiante.crearEstudiante(obj.nombre, obj.email, obj.password, obj.curso);
    console.log(estudiante);
    if(!estudianteDAO.buscarPorEmail(estudiante.email)){
        return res.status(400).json({error:"Ya existente"});
    }
    estudianteDAO.insertarEstudiante(estudiante);
    res.json({mensaje:"Usuario creado exitosamente"});
}

export async function login(req, res){

}