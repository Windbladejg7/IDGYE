import { pool } from "../db/db.js";

export async function agregarPrueba(req, res) {
    const { titulo, descripcion, fecha_max, hora_max, curso } = req.body;
    const cliente = await pool.connect();
    try {
        await cliente.query("BEGIN");
        const result = await cliente.query("INSERT INTO PRUEBA(titulo, descripcion, fecha_max, hora_max) VALUES($1, $2, $3, $4) RETURNING id_prueba",
            [titulo, descripcion, fecha_max, hora_max]);
        const id_prueba = result.rows[0].id_prueba;
        await cliente.query("INSERT INTO PRUEBA_CURSO(id_curso, id_prueba) VALUES($1, $2)", [curso, id_prueba]);
        await cliente.query("COMMIT");
        res.json({ mensaje: "Prueba agregada" });
    } catch (err) {
        await cliente.query("ROLLBACK");
        return res.status(400).json({ error: "Error al agregar la prueba" });
    } finally {
        cliente.release();
    }
}

export async function obtenerPruebasXCurso(req, res) {
    const { curso } = req.params;
    const result = await pool.query("SELECT * FROM prueba_completa WHERE id_curso=$1", [curso]);
    if (!result.rows.length > 0) {
        res.json({ mensaje: "No hay pruebas para este curso" });
    }
    res.json(result.rows);
}

export async function pruebasPendientes(req, res) {
    const {id_estudiante} = req.params;
    const result = await pool.query("SELECT p.id_prueba, p.titulo, CASE WHEN e.id_entrega IS NOT NULL THEN 'Entregada' ELSE 'Pendiente' END AS estado FROM PRUEBA p JOIN PRUEBA_CURSO pc ON pc.id_prueba = p.id_prueba JOIN ESTUDIANTE est ON est.id_estudiante = $1 LEFT JOIN ENTREGA e ON e.id_prueba = p.id_prueba AND e.id_curso = pc.id_curso AND e.id_estudiante = est.id_estudiante WHERE pc.id_curso = est.id_curso", [id_estudiante]);
    res.json(result.rows);
}
