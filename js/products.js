//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Constante que contiene la URL con la información de los diferentes productos.
const URL_INF = "https://japdevdep.github.io/ecommerce-api/product/all.json";

//Función para añadir una tabla con la información obtenida.
const showList = (info) => {
    //Se crea un contenedor para todo lo referido a la informacion obtenida mediante el parametro info.
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("list-group")
    document.getElementById("productsList")
    //Se crea una variable para almacenar el html que se añadira con la lista de articulos.

    for (let i of info) {
        let htmlContentToAppend = "";
        htmlContentToAppend = `
                <div class="row list-group-item">
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
                </div>
            `
        productsContainer.innerHTML += htmlContentToAppend;
    }
    document.getElementById("productsList").appendChild(productsContainer);
}

const priceFilter = (info) => {
    console.log("hola");
    const precioMax = document.getElementById("pricemax-value").value;
    const precioMin = document.getElementById("pricemin-value").value;
    var ordArray = new Array();
    let contador = 0;
    for (let i of info) {
        if ((precioMax >= i.cost) && (i.cost >= precioMin)) {
            ordArray[contador] = i;
            console.log(ordArray);
            contador += 1;
        }
    }
    document.getElementById("productsList").innerHTML = "";
    showList(ordArray);
}

const priceSort = (info) => {
    var buttom = document.getElementById("priceButtom");
    if (buttom.className === "fas mr-1 fa-sort-amount-down") {
        info.sort(function (a, b) {
            return a.cost - b.cost;
        });
        buttom.className = "fas mr-1 fa-sort-amount-up";
        document.getElementById("productsList").innerHTML = "";
        showList(info);
    }
    else if (buttom.className === "fas mr-1 fa-sort-amount-up") {
        info.sort(function (a, b) {
            return b.cost - a.cost;
        });
        buttom.className = "fas mr-1 fa-sort-amount-down";
        document.getElementById("productsList").innerHTML = "";
        showList(info);
    }
}

const relevanceSort = (info) => {

    info.sort(function (a, b) {
        return a.soldCount - b.soldCount;
    });
    document.getElementById("productsList").innerHTML = "";
    showList(info);
}

document.addEventListener("DOMContentLoaded", async function (e) {
    //Utilizamos la funcion getJSONData definida en init.js 
    const info = (await getJSONData(URL_INF)).data;
    showList(info); 

    document.getElementById("filter").addEventListener("click", function () {
        priceFilter(info);
    });

    document.getElementById("sortByPrice").addEventListener("click", function () {
        priceSort(info);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function () {
        relevanceSort(info);
    });
});