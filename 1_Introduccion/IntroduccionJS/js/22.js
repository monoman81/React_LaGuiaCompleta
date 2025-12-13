//Optional chaining
const alumno = {
    nombre: "Carlos",
    clase: "Programacion 1",
    aprobado: true,
    examenes: {
        examen1: 90
    }
}

console.log(alumno.examenes?.examen1)

//Nullish coalesing
const pagina = null ?? 1