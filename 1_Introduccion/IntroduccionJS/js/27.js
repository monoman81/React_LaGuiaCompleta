const url = "https://jsonplaceholder.typicode.com/comments"
const url2 = "https://jsonplaceholder.typicode.com/todos"
const url3 = "https://jsonplaceholder.typicode.com/photos"

// const consultarAPI = async url => {
//     try {
//         const inicio = performance.now()
//         const response = await fetch(url)
//         if (!response.ok)
//             throw new Error("Hubo un error...")
//         const data = await response.json()
//         //console.log(data)
//         const fin = performance.now()
//         console.log(`El resultado es ${fin - inicio}`)
//     }
//     catch(error) {
//
//     }
//
// }
//
// consultarAPI(url)
// consultarAPI(url2)
// consultarAPI(url3)

const consultarAPI2 = async () => {
    try {
        const inicio = performance.now()

        const [ response, response2, response3 ] = await Promise.all([fetch(url), fetch(url2), fetch(url3)])
        const [ data, data2, data3] = await Promise.all([ response.json(), response2.json(), response3.json() ])

        // const response = await fetch(url)
        // if (!response.ok)
        //     throw new Error("Hubo un error...")
        // const data = await response.json()
        //console.log(data)

        //const data = await response.json()


        const fin = performance.now()
        console.log(`El resultado es ${fin - inicio}`)
    }
    catch(error) {

    }
}