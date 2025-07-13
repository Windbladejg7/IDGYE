import {pool} from "../db/db.js";

export async function obtenerCursos(req, res){
    const {id} = req.usuario;
    const result = await pool.query("SELECT * FROM CURSO WHERE id_docente=$1", [id]);
    res.json(result.rows);
}