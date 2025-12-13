const producto = {
    nombre: "Tablet",
    precio: 300,
    disponible: false
}

// Object.freeze(producto)
Object.seal(producto)
producto.disponible = true

producto.imagen = "imagen.jpg"

delete producto.precio

console.log(producto)