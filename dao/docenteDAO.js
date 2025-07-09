import {pool} from "../db/db.js";
import {Docente} from "../modelo/Docente.js";

export async function insertarDocente(docente){
    await pool.query("INSERT INTO DOCENTE(nombre, email, password) VALUES($1, $2, $3)", [docente.nombre, docente.email, docente.password]);
}

export async function buscarPorEmail(email){
    const result = await pool.query("SELECT * FROM DOCENTE WHERE email=$1", [email]);
    const datos = result.rows[0];
    if(!datos){
        return null;
    }
    const docente = new Docente({
        id_docente: datos.id_docente,
        nombre: datos.nombre,
        email: datos.email,
        password: datos.password
    });
    return docente;
}