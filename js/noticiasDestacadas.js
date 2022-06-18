function randomViews(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//carga del localStorage si hay contenido guardado, sino crea 3 noticias del paquete básico para que se observen al iniciar el index sin haber iniciado la seccion noticias
let ftNewsJSON;
let loadFtNewsJSON = JSON.parse (localStorage.getItem ('newPackNewsJSON'));

//uso del operador ternario
loadFtNewsJSON ? ftNewsJSON = loadFtNewsJSON : ftNewsJSON = [
                                                                {fecha: "16/5/2022", titular: "SEGUIMOS TRABAJANDO", contenido: "Se ha añadido un sistema de usuarios al sitio para que puedan ingresar y conseguir otros beneficios por ser parte del club equinoccio lúdico", views: randomViews (1,500)},
                                                                {fecha: "16/5/2022", titular: "NUEVO PROTOTIPO: ROLIWAR", contenido: "Roliwar es un juego de Roll & Write de 1 a 8 jugadores con una duración de 15 a 45 minutos según cantidad de jugadores", views: randomViews (1,500)},
                                                                {fecha: "17/5/2022", titular: "TESTEANDO ROLIWAR", contenido: "Gracias a la comunidad jugona por tan buenas criticas que nos ayudan a seguir mejorando nuestro trabajo día a día. Pronto más novedades.", views: randomViews (1,500)}
                                                            ]

let contentMostViewsNews = "";

for (const iterationIndexNews of ftNewsJSON) {
    contentMostViewsNews += '<div class="col-lg-3 col-md-4 col-sm-8 col-10 p-0"><img src="./images/novedadWeb.jpg" alt="breaking news image" class="img-fluid"><div><h6>'
    + iterationIndexNews.fecha + '</h6></div><div><h3 class="font-weight-bold fontTitleResponsive">' + iterationIndexNews.titular + '</h3></div><div><h5 class="fontContentResponsive">' + iterationIndexNews.contenido
    + '</h5></div><div class="d-flex align-items-center justify-content-center"><img src="./images/view.png" alt="views icon"><h6 class="viewsMargin"> ' + iterationIndexNews.views
    + "</h6></div></div>";
    document.getElementById("ftNewsIndex").innerHTML = contentMostViewsNews;
    
}



