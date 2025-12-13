const formulario = document.querySelector("#formulario")
const inputNombre = document.querySelector("#nombre")
const inputPassword = document.querySelector("#password")

formulario.addEventListener("submit", e => {
    e.preventDefault()
    const nombre = inputNombre.value
    const pwd = inputPassword.value

    console.log(nombre)
    console.log(pwd)

    const alertPrev = document.querySelector(".alerta")

    if (alertPrev)
        alertPrev.remove()

    const alert = document.createElement("DIV")
    alert.classList.add("alerta", "text-white", "uppercase", "text-sm", "text-center", "p-2", "font-black")

    if (nombre === "" || pwd === "") {
        alert.textContent = "Todos los campos son obligatorios"
        console.log("Todos los campos son obligatorios")
        alert.classList.add("bg-red-500")
    }
    else {
        alert.textContent = "Submitted. Registrando"
        console.log("Submitted. Registrando...")
        alert.classList.add("bg-green-500")
    }

    formulario.appendChild(alert)

    setTimeout(() => {
        alert.remove()
    }, 3000)


})