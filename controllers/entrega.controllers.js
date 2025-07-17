import { pool } from "../db/db.js";

export async function agregarEntrega(req, res) {
    const { arbol_archivos, id_prueba, id_curso, calificacion } = req.body;
    const { id } = req.usuario;
    try {
        await pool.query("INSERT INTO ENTREGA(arbol_archivos, id_prueba, id_estudiante, id_curso, calificacion) VALUES($1, $2, $3, $4, $5)", [arbol_archivos, id_prueba, id, id_curso, calificacion]);
        res.json({ mensaje: "Entrega agregada" });
    } catch (err) {
        res.status(400).json({ error: "Error al insertar la entrega" });
    }
}

export async function obtenerEntregasPorPrueba(req, res) {
    const { id_prueba, id_curso } = req.params;
    const result = await pool.query("SELECT e.id_entrega, e.fecha_entrega, e.hora_entrega, e.calificacion, e.id_prueba, e.id_curso, est.nombre FROM ENTREGA e INNER JOIN ESTUDIANTE est ON e.id_estudiante = est.id_estudiante WHERE id_prueba=$1 AND e.id_curso=$2", [id_prueba, id_curso]);
    res.json(result.rows);
}

export async function miEntrega(req, res) {
    const { id_prueba } = req.params;
    const usuario = req.usuario;
    const result = await pool.query("SELECT * FROM ENTREGA WHERE id_prueba=$1 AND id_estudiante=$2", [id_prueba, usuario.id]);
    res.json(result.rows[0]);
}

export async function agregarCodigoDePrueba(req, res) {
    const { arbol_archivos, id_prueba, id_curso, codigo, language } = req.body;
    const response = await fetch(`https://idgye.onrender.com/api/pruebas/codigo/${id_prueba}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const pruebas = await response.json();

    if (response.ok) {
        const load = codigo.content + "\n" + pruebas.pruebas;
        console.log(load);
        const submit = await fetch("https://idgye.onrender.com/api/judge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: load, language })
        });

        const resultado = await submit.json();
        let entrega;
        if (!resultado.stderr) {
            entrega = {arbol_archivos, id_prueba, id_curso, calificacion:10};
        }else{
            entrega = {arbol_archivos, id_prueba, id_curso, calificacion:5};
        }

        const mensaje = await fetch("https://idgye.onrender.com/api/entregas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": req.headers.authorization
            },
            body: JSON.stringify(entrega)
        });
        res.json(await mensaje.json());
    }

}


export async function obtenerTotalEntregas(req, res){
    const {id_prueba, id_curso} = req.params;
    const result = await pool.query("SELECT COUNT(*) as total_entregas FROM ENTREGA WHERE id_prueba=$1 AND id_curso=$2", [id_prueba, id_curso]);
    res.json(result.rows[0]);
}