//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const buttonLogin = () => {
    const txtuserEmail = document.getElementById("email");
    const txtuserPassword= document.getElementById("password");
    const userEmail = txtuserEmail.value;
    const userPassword = txtuserPassword.value;
    localStorage.setItem("email",userEmail);
    localStorage.setItem("password",userPassword);
    if (userEmail && userPassword) {
        window.location = "index.html"
        localStorage.setItem("logged","true")
    }
    else
    {
        alert("Debe ingresar datos validos.")
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("login").addEventListener("click", buttonLogin);
});