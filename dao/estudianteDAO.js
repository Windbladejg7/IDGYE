import {pool} from "../db/db.js";
import {Estudiante} from "../modelo/Estudiante.js";

export async function insertarEstudiante(estudiante){
    await pool.query("INSERT INTO ESTUDIANTE(nombre, email, password, id_curso) VALUES($1, $2, $3, $4)", [estudiante.nombre, estudiante.email, estudiante.password, estudiante.curso]);
}

export async function buscarPorEmail(email){
    const result = await pool.query("SELECT * FROM ESTUDIANTE WHERE email=$1", [email]);
    const datos = result.rows[0];
    if(!datos){
        return null;
    }
    const estudiante = new Estudiante({
        id_estudiante: datos.id_estudiante, 
        nombre: datos.nombre, 
        email: datos.email, 
        password: datos.password, 
        curso: datos.id_curso
    });
    return estudiante;
}