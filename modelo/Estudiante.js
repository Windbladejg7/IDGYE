import bcrypt from "bcrypt";

export class Estudiante{
    constructor(nombre, email, password, curso){
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.curso = curso;
    }

    static async crearEstudiante(nombre, email, password, curso){
        const hash = await bcrypt.hash(password, 10);
        return new Estudiante(nombre, email, hash, curso);
    }

    verficarPassword(password){
        return bcrypt.compare(password, this.password);
    }
}