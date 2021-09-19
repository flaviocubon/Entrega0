//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Constante que contiene la URL con la información de los diferentes productos.
const URL_INF = "https://japdevdep.github.io/ecommerce-api/product/all.json";
var currentProductsArray = "";
//Función para añadir una tabla con la información obtenida.
const showList = (info) => {
    //Se crea un contenedor para todo lo referido a la informacion obtenida mediante el parametro info.
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("list-group")
    document.getElementById("productsList")
    currentProductsArray= info;
    //Se crea una variable para almacenar el html que se añadira con la lista de articulos.

    for (let i of info) {
        let htmlContentToAppend = "";
        htmlContentToAppend = `
         <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                    <div class="descCar col">
                        <div class="d-flex justify-content-between">
                            <h4 class="mb-1"> ${i.name} </h4>
                            <small class="text-muted soldCount"> Cantidad vendida: ${i.soldCount} </small>
                        </div>
                        <p class="mb-1">
                            <ul>
                                <li> ${i.description} </li>
                                <li> ${i.cost} ${i.currency} </li>
                            </ul> 
                        </p>
                    </div>
                    <div class="imgCar col-5">
                        <img src="${i.imgSrc}" alt="${i.name}" class="img-thumbnail">
                    </div>
                    </div>
            </a>
            `
        productsContainer.innerHTML += htmlContentToAppend;
    }
    document.getElementById("productsList").appendChild(productsContainer);
}

//Se define una funcion que selecciona que productos mostrar segun el precio ingreasdo
const priceFilter = (info) => {
    const precioMax = document.getElementById("pricemax-value").value;
    const precioMin = document.getElementById("pricemin-value").value;
    var ordArray = new Array();
    let contador = 0;
    for (let i of info) {
        if (((precioMax === "") && (precioMin <= i.cost)) || ((precioMin === "") && (precioMax >= i.cost)) || ((precioMax >= i.cost) && (i.cost >= precioMin))) {
            ordArray[contador] = i;
            contador += 1;
        }
    }
    //Se sustituye la informacion inicial por la informacion filtrada
    document.getElementById("productsList").innerHTML = "";
    showList(ordArray);
}

//Se define una funcion que se encarga de ordenar los productos segun su precio
const priceSort = (info) => {
    var buttom = document.getElementById("priceButtom");
    //En caso de que se ordene de forma descendente el boton cambia de apariencia a la forma ascendente
    if (buttom.className === "fas mr-1 fa-sort-amount-up") {
        info.sort(function (a, b) {
            return a.cost - b.cost;
        });
        buttom.className = "fas mr-1 fa-sort-amount-down";
        document.getElementById("productsList").innerHTML = "";
        showList(info);
    }
    //En caso de que se ordene de forma ascendente el boton cambia de apariencia a la forma descendente
    else if (buttom.className === "fas mr-1 fa-sort-amount-down") {
        info.sort(function (a, b) {
            return b.cost - a.cost;
        });
        buttom.className = "fas mr-1 fa-sort-amount-up";
        document.getElementById("productsList").innerHTML = "";
        showList(info);
    }
}

//Se define una funcion que ordena la informacion segun la cantidad de productos vendidos
const relevanceSort = (info) => {

    info.sort(function (a, b) {
        return b.soldCount - a.soldCount;
    });
    document.getElementById("productsList").innerHTML = "";
    showList(info);
}

document.addEventListener("DOMContentLoaded", async function (e) {
    //Utilizamos la funcion getJSONData definida en init.js 
    const info = (await getJSONData(URL_INF)).data;
    showList(info); 

    //Se les agrega un evento de "clickeo" a los diferentes botones correspondiente al orden
    document.getElementById("filter").addEventListener("click", function () {
        priceFilter(info);
    });

    document.getElementById("sortByPrice").addEventListener("click", function () {
        priceSort(currentProductsArray);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function () {
        relevanceSort(currentProductsArray);
    });
    
});