import {pool} from "../db/db.js";

export async function agregarEntrega(req, res){
    const {arbol_archivos, id_prueba, id_curso} = req.body;
    const {id} = req.usuario;
    try{
        await pool.query("INSERT INTO ENTREGA(arbol_archivos, id_prueba, id_estudiante, id_curso) VALUES($1, $2, $3, $4)", [arbol_archivos, id_prueba, id, id_curso]);
        res.json({mensaje:"entrega agregada"});
    }catch(err){
        res.status(400).json({error:"Error al insertar la entrega"});
    }
}

export async function obtenerEntregasPorPrueba(req, res){
    const {id_prueba, id_curso} = req.params;
    const result = await pool.query("SELECT * FROM ENTREGA WHERE id_prueba=$1 AND id_curso=$2", [id_prueba, id_curso]);
    res.json(result.rows);
}

export async function miEntrega(req, res){
    const {id_prueba} = req.params;
    const usuario = req.usuario;
    const result = await pool.query("SELECT * FROM ENTREGA WHERE id_prueba=$1 AND id_estudiante=$2", [id_prueba, usuario.id]);
    res.json(result.rows[0]);
}