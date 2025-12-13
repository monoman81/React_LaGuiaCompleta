const inputNombre = document.querySelector("#nombre")
const inputPassword = document.querySelector("#password")

inputNombre.addEventListener("input", e => {

})

inputPassword.addEventListener("input", () => {
    inputPassword.type = "text"
    setTimeout(() => {
        inputPassword.type = "password"
    }, 300)
})
