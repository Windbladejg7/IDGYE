CREATE TABLE PRUEBA(
    id_prueba SERIAL PRIMARY KEY,
    titulo TEXT UNIQUE NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    fecha_max DATE NOT NULL,
    inicia TIME DEFAULT LOCALTIME(0),
    hora_max TIME NOT NULL,
    codigo_pruebas JSONB
);

CREATE TABLE DOCENTE(
    id_docente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO DOCENTE(nombre, email, password)
VALUES('Christina Jacome', 'modelamiento@gmail.com', '$2b$10$0BH73gOo.oDL8AKzYS7HSuwalsm2vZZwRISz9WFI0IhIauVMN5TO.');

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
    id_curso INT,
    id_prueba INT,
    id_estudiante INT,
    CONSTRAINT fk_prueba FOREIGN KEY(id_prueba) REFERENCES PRUEBA(id_prueba),
    CONSTRAINT fk_estudiante FOREIGN KEY(id_estudiante) REFERENCES ESTUDIANTE(id_estudiante),
    CONSTRAINT fk_prueba_curso FOREIGN KEY(id_curso, id_prueba) REFERENCES PRUEBA_CURSO(id_curso, id_prueba)
);

ALTER TABLE ENTREGA
ADD CONSTRAINT entrega_unica_por_estudiante
UNIQUE (id_estudiante, id_prueba, id_curso);

CREATE VIEW prueba_completa AS 
SELECT p.id_prueba, p.titulo, p.descripcion, p.fecha_creacion, p.fecha_max, p.inicia as hora_inicio, 
p.hora_max, c.id_curso, c.nombre as curso, d.nombre as docente 
FROM PRUEBA p 
INNER JOIN PRUEBA_CURSO pc ON pc.id_prueba = p.id_prueba 
INNER JOIN CURSO c ON pc.id_curso = c.id_curso 
INNER JOIN DOCENTE d ON d.id_docente = c.id_docente;

CREATE VIEW prueba_con_estado AS
SELECT 
  est.id_estudiante,
  est.id_curso,
  p.id_prueba, 
  p.titulo, 
  TO_CHAR(p.hora_max, 'HH24:MI') AS hora_max, 
  p.fecha_max as fecha,
  CASE 
    WHEN e.id_entrega IS NOT NULL THEN 'Entregada' 
    WHEN e.id_entrega IS NULL AND p.fecha_max >= CURRENT_DATE THEN 'Pendiente'
    WHEN e.id_entrega IS NULL AND p.fecha_max < CURRENT_DATE THEN 'Atrasada'
  END AS estado
FROM PRUEBA p 
JOIN PRUEBA_CURSO pc ON pc.id_prueba = p.id_prueba 
JOIN ESTUDIANTE est ON pc.id_curso = est.id_curso
LEFT JOIN ENTREGA e 
  ON e.id_prueba = p.id_prueba 
  AND e.id_curso = pc.id_curso 
  AND e.id_estudiante = est.id_estudiante
ORDER BY p.fecha_max, p.hora_max;
