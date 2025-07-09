import bcrypt from "bcrypt";

export class Estudiante{
    constructor({id_estudiante, nombre, email, password, curso}){
        this.id_estudiante = id_estudiante;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.curso = curso;
    }

    static async crearEstudiante({id_estudiante = null, nombre, email, password, curso}){
        const hash = await bcrypt.hash(password, 10);
        return new Estudiante({id_estudiante, nombre, email, password: hash, curso});
    }

    async verificarPassword(password){
        const resultado = await bcrypt.compare(password, this.password);
        return resultado;
    }
}