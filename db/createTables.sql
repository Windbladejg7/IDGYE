CREATE TABLE PRUEBA(
    id_prueba SERIAL PRIMARY KEY,
    titulo TEXT UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    fecha_max DATE NOT NULL,
    inicia TIME DEFAULT LOCALTIME(0),
    hora_max TIME NOT NULL
);

CREATE TABLE DOCENTE(
    id_docente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO DOCENTE(nombre, email, password)
VALUES('Carla Abad', 'mimadre@gmail.com', 'mejorprofesoraever');

CREATE TABLE CURSO(
    id_curso SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    id_docente INT,
    CONSTRAINT fk_docente FOREIGN KEY(id_docente) REFERENCES DOCENTE(id_docente)
);

INSERT INTO CURSO(nombre, id_docente)
VALUES('4-12', 1);

CREATE TABLE PRUEBA_CURSO(
    id_curso INT,
    id_prueba INT,
    CONSTRAINT fk_curso FOREIGN KEY(id_curso) REFERENCES CURSO(id_curso),
    CONSTRAINT fk_prueba FOREIGN KEY(id_prueba) REFERENCES PRUEBA(id_prueba),
    CONSTRAINT pk_prueba_curso PRIMARY KEY(id_curso, id_prueba)
);

CREATE TABLE ESTUDIANTE(
    id_estudiante SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    id_curso INT,
    CONSTRAINT fk_curso FOREIGN KEY(id_curso) REFERENCES CURSO(id_curso)
);

CREATE TABLE ENTREGA(
    id_entrega SERIAL PRIMARY KEY,
    arbol_archivos JSONB NOT NULL,
    calificacion NUMERIC(4,2),
    fecha_entrega DATE DEFAULT CURRENT_DATE,
    hora_entrega TIME DEFAULT LOCALTIME(0),

    id_prueba INT,
    id_estudiante INT,
    CONSTRAINT fk_prueba FOREIGN KEY(id_prueba) REFERENCES PRUEBA(id_prueba),
    CONSTRAINT fk_estudiante FOREIGN KEY(id_estudiante) REFERENCES ESTUDIANTE(id_estudiante)
);

CREATE VIEW prueba_completa AS 
SELECT p.titulo, p.descripcion, p.fecha_creacion, p.fecha_max, p.inicia as hora_inicio, 
p.hora_max, c.id_curso, c.nombre as curso, d.nombre as docente 
FROM PRUEBA p 
INNER JOIN PRUEBA_CURSO pc ON pc.id_prueba = p.id_prueba 
INNER JOIN CURSO c ON pc.id_curso = c.id_curso 
INNER JOIN DOCENTE d ON d.id_docente = c.id_docente;