function randomViews(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function news (fecha, titular, contenido, views) {
    this.fecha = fecha;
    this.titular = titular;
    this.contenido = contenido;
    this.views = views;
}

//para cargar las noticias guardadas o cargar solo el paquete iniciador de noticias
let packNews;
let loadPackNews = JSON.parse(localStorage.getItem ('packOfNews'));

//uso del operador ternario
loadPackNews ? packNews = loadPackNews : packNews = [
                                                        {fecha: "14/5/2022", titular: "BIENVENIDOS A NUESTRO NUEVO SITIO", contenido: "Con gran esfuerzo hemos logrado desarrollar nuestro propio sitio web para que estén al tanto de todas las novedades de la editorial", views: randomViews (1,500)},
                                                        {fecha: "15/5/2022", titular: "PRIMER ENCUENTRO DE JUEGOS DE MESA", contenido: "Hoy Domingo se llevó a cabo el primer encuentro de la editorial con un éxito rotundo en la ciudad de Villa Ramallo. Gracias!!", views: randomViews (1,500)},
                                                        {fecha: "16/5/2022", titular: "SEGUIMOS TRABAJANDO", contenido: "Se ha añadido un sistema de usuarios al sitio para que puedan ingresar y conseguir otros beneficios por ser parte del club equinoccio lúdico", views: randomViews (1,500)},
                                                        {fecha: "16/5/2022", titular: "NUEVO PROTOTIPO: ROLIWAR", contenido: "Roliwar es un juego de Roll & Write de 1 a 8 jugadores con una duración de 15 a 45 minutos según cantidad de jugadores", views: randomViews (1,500)},
                                                        {fecha: "17/5/2022", titular: "TESTEANDO ROLIWAR", contenido: "Gracias a la comunidad jugona por tan buenas criticas que nos ayudan a seguir mejorando nuestro trabajo día a día. Pronto más novedades.", views: randomViews (1,500)}
                                                    ]; 
saveNews();

//acceso solo para admin, para agregar noticias
let writer;
let access = sessionStorage.getItem ('accountAccessStorage');
let adminAccessAccount = sessionStorage.getItem ('adminAccount');

if (adminAccessAccount = true && adminAccessAccount != null) {
    let btnGoUploadNews = document.getElementById ("btnAccessAdminUploadNews");
    btnGoUploadNews.innerHTML = '<a href="../pages/subir_noticias.html"><button type="button" class="btn btn-outline-danger">Subir Nuevas Noticias</button></a>'
    
    //creación del objeto fecha de la librería Luxon...poner en subirNoticias.js
    const newsDate = luxon.DateTime.local ();
    for (let i = 0; i < writer; i++) {
        let newNews = new news (newsDate.toLocaleString(), prompt ("Inserte título de noticia aquí").toUpperCase(), prompt ("Inserte el contenido de la noticia"), randomViews (1,500));
        packNews.push (newNews);
        saveNews ();
    }
}


//agregado de contenido al apartado de noticias
let content = "";

for (const packNewsWriting of packNews) {
    content += '<div class="container"><img src="../images/novedadWeb.jpg" alt="breaking news image" width="200px"><div><h6>' + packNewsWriting.fecha + "</h6></div><br /><div><h2>" + packNewsWriting.titular + "</h2></div><br /><div><h4>" + packNewsWriting.contenido + '</h4></div><div class="dispFlex"><img src="../images/view.png" alt="views icon"><h4> ' + packNewsWriting.views + "</h4></div></div>"
    document.getElementById ("equinoccioNews").innerHTML = content;
}

//noticias mas vistas que van al index (se abrevia el código usado anteriormente)
const viewsPackNews = packNews.map ((el)=>el.views);
const breakingNewsPack = [];
//uso de operador Spread
for (let i = 0; i < 3; i++) {
    let mostViewsNumber = Math.max (...viewsPackNews);
    const breakingNews = packNews.filter ((el)=>el.views == mostViewsNumber);
    breakingNewsPack.push (breakingNews[0]);
    const index = viewsPackNews.indexOf (mostViewsNumber);
    viewsPackNews.splice (index, 1);
}

localStorage.setItem ('newPackNewsJSON', JSON.stringify (breakingNewsPack));

//funcion para guardar las noticias que se vayan acumulando
function saveNews () {
    localStorage.setItem ('packOfNews', JSON.stringify(packNews));
}
