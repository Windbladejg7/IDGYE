import {pool} from "../db/db.js";
import { buscarPorEmail } from "../dao/estudianteDAO.js";

export async function obtenerTotalEstudiantes(req, res){
    const {id_curso} = req.params;
    const result = await pool.query("SELECT COUNT(*) as total_estudiantes FROM ESTUDIANTE WHERE id_curso=$1", [id_curso]);
    res.json(result.rows[0]);
}

export async function obtenerUsuario(req, res){
    const {email} = req.params;
    const result = await buscarPorEmail(email);
    res.json(result);
}