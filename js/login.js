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
        //En caso de que los campoes esten vacios se notifica al usuario.
        alert("Los campos no deben estar vacios")
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    //Hace que se ejecute la funcion correspondiente al login cuando el usuario presiona el boton
    document.getElementById("login").addEventListener("click", buttonLogin);
    //Limpiamos localStorage para que el usuario no pueda ingresar a la pagina si un login quedo a la mitad del proceso, ya que en caso de que
    //ejecute el login, esta linea no se ejecutara, quedando almacenados sus datos
    localStorage.clear();
});