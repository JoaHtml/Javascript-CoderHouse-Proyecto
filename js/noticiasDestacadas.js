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
    contentMostViewsNews += '<div><img src="./images/novedadWeb.jpg" alt="breaking news image" width="200px"><div><h6>'
    + iterationIndexNews.fecha + "</h6></div><br /><div><h2>" + iterationIndexNews.titular + "</h2></div><br /><div><h3>" + iterationIndexNews.contenido
    + '</h3></div><div class="dispFlex"><img src="./images/view.png" alt="views icon"><h4> ' + iterationIndexNews.views
    + "</h4></div></div>";
    document.getElementById("ftNewsIndex").innerHTML = contentMostViewsNews;
    
}



