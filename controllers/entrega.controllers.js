import {pool} from "../db/db.js";

export async function agregarEntrega(req, res){
    const {arbol_archivos, id_prueba, id_estudiante} = req.body;
    try{
        await pool.query("INSERT INTO ENTREGA(arbol_archivos, id_prueba, id_estudiante) VALUES($1, $2, $3)", [arbol_archivos, id_prueba, id_estudiante]);
        res.json({mensaje:"entrega agregada"});
    }catch(err){
        res.status(400).json({error:"Error al insertar la entrega"});
    }
}

export async function obtenerEntregasPorPrueba(){
    const result = await pool.query("SELECT * FROM ");
}