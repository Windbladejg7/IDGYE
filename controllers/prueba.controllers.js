import { pool } from "../db/db.js";

export async function agregarPrueba(req, res) {
    const { titulo, descripcion, fecha_max, hora_max, curso , codigo_pruebas} = req.body;
    const cliente = await pool.connect();
    try {
        await cliente.query("BEGIN");
        const result = await cliente.query("INSERT INTO PRUEBA(titulo, descripcion, fecha_max, hora_max, codigo_pruebas) VALUES($1, $2, $3, $4, $5) RETURNING id_prueba",
            [titulo, descripcion, fecha_max, hora_max, codigo_pruebas]);
        const id_prueba = result.rows[0].id_prueba;
        await cliente.query("INSERT INTO PRUEBA_CURSO(id_curso, id_prueba) VALUES($1, $2)", [curso, id_prueba]);
        await cliente.query("COMMIT");
        res.json({ mensaje: "Prueba agregada" });
    } catch (err) {
        await cliente.query("ROLLBACK");
        console.log(err)
        return res.status(400).json({ error: "Error al agregar la prueba" });
    } finally {
        cliente.release();
    }
}

export async function obtenerPruebasXCurso(req, res) {
    const { curso } = req.params;
    const result = await pool.query("SELECT * FROM prueba_completa WHERE id_curso=$1", [curso]);
    res.json(result.rows);
}

export async function pruebasPendientes(req, res) {
    const {id} = req.usuario;
    let query = "SELECT * FROM prueba_con_estado WHERE id_estudiante = $1 ";
    const atrasadas = req.query.atrasadas;
    const estado = req.query.estado;
    if(atrasadas){
        query+="AND fecha <= CURRENT_DATE";
    }
    if(estado){
        query+=` AND estado='${estado}'`;
    }
    const result = await pool.query(query, [id]);
    res.json(result.rows);
}

export async function obtenerInfoPrueba(req, res){
    const {id_prueba} = req.params;
    const result = await pool.query("SELECT * FROM prueba_completa WHERE id_prueba=$1", [id_prueba]);
    res.json(result.rows[0]);
}

export async function obtenerCasosDePrueba(req, res){
    const {id_prueba} = req.params;
    const result = await pool.query("SELECT * FROM PRUEBA WHERE id_prueba=$1", [id_prueba]);
    res.json(result.rows[0].codigo_pruebas);
}
