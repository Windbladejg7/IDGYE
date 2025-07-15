import { buscarPorEmail } from "../dao/docenteDAO.js";

export async function obtenerDocente(req, res){
    const {email} = req.params;
    const docente = await buscarPorEmail(email);
    res.json(docente);
}