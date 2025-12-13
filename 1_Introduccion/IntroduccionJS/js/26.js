//Fetch API async / await
const url = "https://jsonplaceholder.typicode.com/comments"

// const consultarAPI = () => {
//     fetch(url)
//         .then(response => {
//             //console.log(response)
//             if (response.ok)
//                 return response.json()
//             throw new Error("Hubo un error...")
//         })
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

const consultarAPI = async () => {
    try {
        const response = await fetch(url)
        if (!response.ok)
            throw new Error("Hubo un error...")
        const data = await response.json()
        console.log(data)
    }
    catch(error) {

    }

}

consultarAPI()