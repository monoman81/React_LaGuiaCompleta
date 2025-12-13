const producto = {
    nombre: "Tablet",
    precio: 300,
    disponible: false
}

const cliente = {
    nombre: "Carlos",
    premium: true,
    direccion: {
        calle: "Calle Mexico"
    }
}

const { nombre } = producto
const { nombre: nombreCliente, direccion: { calle } } = cliente

console.log(nombre)
console.log(nombreCliente)
console.log(calle)