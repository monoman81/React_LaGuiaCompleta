const tecnologias = [ "HTML", "CSS", "JavaScript", "React.js", "Node.js" ]

// tecnologias.push("Nest.js")
//
// console.log(tecnologias)
//
// const nuevoArreglo = [...tecnologias, "Nest.js"]
// console.log(nuevoArreglo)
//
// tecnologias.shift()
// console.log(tecnologias)

// const tecnologias2 = tecnologias.filter(tech => {
//     if (tech === "HTML")
//         return tech
// })

const tecnologias2 = tecnologias.map(tech => {
    if (tech === "Node.js")
        return "Nest.js"
    else
        return tech
})

console.log(tecnologias2)
