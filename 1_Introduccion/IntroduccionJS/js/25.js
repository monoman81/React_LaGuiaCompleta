//Fetch API with Promises
const url = "https://jsonplaceholder.typicode.com/comments"

fetch(url)
    .then(response => {
        //console.log(response)
        if (response.ok)
            return response.json()
        throw new Error("Hubo un error...")
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })