//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const showInfo = (info) => {
  var productsContainer = document.createElement("div");
  productsContainer.classList.add("list-group")
  let htmlContentToAppend = "";
  htmlContentToAppend = `
                <div class="row list-group-item">
                    <div class="row">
                    <div class="descCar col">
                        <div class="d-flex justify-content-between">
                            <h4 class="mb-1"> ${info.name} </h4>
                            <small class="text-muted soldCount"> Cantidad vendida: ${info.soldCount} </small>
                        </div>
                        <p class="mb-1">
                            <ul>
                                <li> <b> Descripción: </b> ${info.description} </li> <br>
                                <br>
                                <li> <b> Costo: </b> ${info.cost} ${info.currency} </li>
                            </ul> 
                        </p>
                    </div>
                </div>
            `
  htmlContentToAppend += `
            <div id="carouselExampleIndicators" class="carousel slide carrouselCar" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src=" ${info.images[0]}" alt="First slide">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src=" ${info.images[1]}" alt="Second slide">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src=" ${info.images[2]}" alt="Third slide">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src=" ${info.images[3]}" alt="Third slide">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src=" ${info.images[4]}" alt="Third slide">
              </div>
              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          `
  productsContainer.innerHTML += htmlContentToAppend;
  document.getElementById("productinfo").appendChild(productsContainer);
}
//Función dedicada a la carga de comentarios del JSON
const showcomments = (comments) => {
  //Se crea un contenedor para todo lo referido a la informacion obtenida mediante el parametro info.
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("list-group")
  document.getElementById("commentsList")
  for (let i of comments.data) {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
                <div class="row list-group-item">
                    <div class="row">
                    <div class="descCar col">
                        <div class="d-flex justify-content-between">
                            <h4 class="mb-1"> ${i.user} </h4>
                            <small class="text-muted soldCount"> Fecha: ${i.dateTime} </small>
                        </div>
                        <p class="mb-1">
                            <ul>
                                <li> ${i.description} </li>
                            </ul> 
                        </p>
                    </div>
                    <div class="col-5">
                        <span class="commentsScore"> Puntaje: ${i.score}/5 </span>
                    </div>
                    </div>
                </div>
            `
    commentsContainer.innerHTML += htmlContentToAppend;
  }
  document.getElementById("commentsList").appendChild(commentsContainer);
}
//Funcion dedicada al manejo y coloreado de las estrellas de puntuación
function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
//Funcion que limpia el area de texto
const publish = (commentText) => {
  if (commentText.value === "") {
    alert('El campo no debe estar vacio')
  }
  else
  {
  commentText.value = ""; 
  const ratingStars = [...document.getElementsByClassName("rating__star")];
  const starClassInactive = "rating__star far fa-star";
  const starClassActive = "rating__star fas fa-star";
  for (let i = 0; i < ratingStars.length ; i++) {
    if (ratingStars[i].className === starClassActive) {
      ratingStars[i].className = starClassInactive;
    }
  }
  alert('Su comentario ha sido publicado con exito.')
 }
}


document.addEventListener("DOMContentLoaded", async function (e) {
  const ratingStars = [...document.getElementsByClassName("rating__star")];
  const info = (await getJSONData(PRODUCT_INFO_URL)).data;
  showInfo(info);
  const comments = (await getJSONData(PRODUCT_INFO_COMMENTS_URL))
  showcomments(comments);
  executeRating(ratingStars);
  const commentText = document.getElementById("userComment");

  document.getElementById("publish").addEventListener("click", function () {
    publish(commentText);
  });

});