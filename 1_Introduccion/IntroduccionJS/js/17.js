const tecnologias = [ "HTML", "CSS", "JavaScript", "React.js", "Node.js" ]
const numeros = [ 10, 20, 30 ]

//Filter
const nuevoArray = tecnologias.filter(tech => tech === "HTML")
console.log(nuevoArray)

//Some
const resultado = numeros.some(numero => numero > 15)

console.log(resultado)

//Find
const resultado2 = numeros.find(numero => numero > 15)
console.log(resultado2)

//Reduce
const resultado3 = numeros.reduce((total, numero) => {
    total += numero
    return total
}, 0)

console.log(resultado3)