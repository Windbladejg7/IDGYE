import bcrypt from "bcrypt";

export class Docente{
    constructor({id_docente, nombre, email, password}){
        this.id_docente = id_docente;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    static async crearDocente({id_docente = null, nombre, email, password}){
        const hash = await bcrypt.hash(password, 10);
        return new Docente({id_docente, nombre, email, password:hash});
    }

    async verificarPassword(password){
        const result = await bcrypt.compare(password, this.password);
        return result;
    }
}