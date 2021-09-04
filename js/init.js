const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //Almacenamos la pagina en la que se encuentra el usuario
  var currentPage = window.location.pathname.split("/");
  //Si el usuario no esta logueado y la pagina mostrada no es la correspondiente al ingreso del mismo se lo envia a la misma
  if ((localStorage.getItem("logged") === null) && (currentPage[currentPage.length - 1] != "login.html")) {
    //Se crea un elemento que deja saber al programa que el usuario esta en el proceso de login, evitando la repeticion del codigo
    localStorage.setItem("logged", "waiting");
    window.location = "login.html";
  }
  let userSign = document.createElement("div");
  userSign.classList.add("userSign");
  userSign.innerHTML = `<span class="py-2 d-none d-md-inline-block" > ${localStorage.getItem("email")} </span>`;
  if ((currentPage[currentPage.length - 1] != "login.html")) {
    document.getElementById("navigationDiv").appendChild(userSign);
  }
});