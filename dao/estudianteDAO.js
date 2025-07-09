import {pool} from "../db/db.js";
import {Estudiante} from "../modelo/Estudiante.js";

export async function insertarEstudiante(estudiante){
    await pool.query("INSERT INTO ESTUDIANTE(nombre, email, password, id_curso) VALUES($1, $2, $3, $4)", [estudiante.nombre, estudiante.email, estudiante.password, estudiante.curso]);
}

export async function buscarPorEmail(email){
    const result = await pool.query("SELECT * FROM ESTUDIANTE WHERE email=$1", [email]);
    console.log(result.rows.length > 0)
    return result.rows.length > 0;
}