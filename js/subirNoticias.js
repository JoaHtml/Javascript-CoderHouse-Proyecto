function randomViews(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let addPackNews = JSON.parse(localStorage.getItem ('packOfNews'));
console.log (addPackNews);

closeAdminAccount()

//funcion para volver a la página de noticias si se cierra sesión de admin y no poder ingresar cualquier otro aún teniendo el link
function closeAdminAccount(){
    let adminAccessAccount = sessionStorage.getItem ('adminAccount');

    if (adminAccessAccount == null) {
        location.href = "../pages/noticias.html"
    }
}

function disableSubmitBtn () {
  if (document.getElementById ("titleNews").value == "" && document.getElementById ("contentNews").value == "" ){
    document.getElementById ('btnSubmit').setAttribute ('disabled', '');
  }
}

disableSubmitBtn ()

let newNews;

function capturar (e) {
  console.log ("cap");
  let titleCapture = document.getElementById ("titleNews").value;
  console.log (titleCapture);
  let contentCapture = document.getElementById ("contentNews").value;
  console.log (contentCapture);
  
  function AddNews (fecha, titular, contenido, views) {
      this.fecha = fecha;
      this.titular = titular;
      this.contenido = contenido;
      this.views = views;
  }
  
  newNews = new AddNews (luxon.DateTime.local().toLocaleString(), titleCapture.toUpperCase (), contentCapture, randomViews(1,500));
  console.log (newNews);
  document.getElementById ('prevNews').innerHTML = "";
  agregar ();
  location.reload();
}

function agregar () {
  addPackNews.push (newNews);
  console.log (addPackNews);
  localStorage.setItem ('packOfNews', JSON.stringify(addPackNews));
}


function previsualNews () {
  let titleCaptureNow = document.getElementById ("titleNews").value;
  console.log ('ahora' + titleCaptureNow);
  let contentCaptureNow = document.getElementById ("contentNews").value;
  console.log ('ahoraaa' + contentCaptureNow);
  document.getElementById ('prevNews').innerHTML = '<div class="container"><img src="../images/novedadWeb.jpg" alt="breaking news image" width="200px"><div><h6>' + luxon.DateTime.local().toLocaleString() + "</h6></div><br /><div><h2>" + titleCaptureNow.toUpperCase() + "</h2></div><br /><div><h4>" + contentCaptureNow + '</h4></div><div class="dispFlex"><img src="../images/view.png" alt="views icon"><h4> ' + randomViews(1,500) + '</h4></div></div>';

  if (document.getElementById ("titleNews").value != "" && document.getElementById ("contentNews").value != "" ){
    document.getElementById ('btnSubmit').removeAttribute ('disabled');
  } else {
    swal.fire ({    title:'Completar campos',
                    text: 'Deberá ingresar un Titulo y/o un Contenido para la noticia antes de subirla',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    background: '#fff0f0',
                    position: 'top-end'

    })
  }
}
/* //funcion para guardar las noticias que se vayan acumulando
function saveNews () {
    localStorage.setItem ('packOfNews', JSON.stringify(packNews));
}

//subida de la historia al darle submit al formulario
let newsDate;

function NewsAdd (dateAdd, titleAdd, contentAdd, viewsAdd) {
  this.dateAdd = dateAdd;
  this.titleAdd = titleAdd;
  this.contentAdd = contentAdd;
  this.viewsAdd = viewsAdd;
}

function newsDateChange () {
  sessionStorage.setItem ('newsDateChecked' , newsDate);
}

function createDate () {
    const radioCheckedActualDate = document.getElementById("gridRadios1")
    radioCheckedActualDate.addEventListener('change', (e) => {
      if (e.currentTarget.checked) {
        newsDate = luxon.DateTime.local().toLocaleString();
        console.log (newsDate);
        newsDateChange ();
      }
    })

    const radioCheckedOtherDate = document.getElementById("gridRadios2")
    radioCheckedOtherDate.addEventListener('change', (e) => {
      if (e.currentTarget.checked) {
        let inputOtherDate = document.getElementById ("inputOtherDate")
        inputOtherDate.innerHTML = '<div class="input-group"><span class="input-group-text">Fecha(dd/mm/aaaa)</span><input type="text" aria-label="día" class="form-control" id="dayDate" maxlength="2">/<input type="text" aria-label="mes" class="form-control" id="monthDate" maxlength="2">/<input type="text" aria-label="año" class="form-control" id="yearDate" maxlength="4"></div>'
        newsDate = document.getElementById ("dayDate").value + "/" + document.getElementById ("monthDate").value + "/" + document.getElementById ("yearDate").value;
        console.log (newsDate);
        newsDateChange ();
      }
    })
    newsDate = sessionStorage.getItem ('newsDateChecked');
    console.log (newsDate);
    return newsDate;
}

//subir la noticia escrita
let title;
let content;
let uploadNews = document.getElementById ("formUploadNews");
uploadNews.addEventListener ('submit', submitForm ());

function submitForm (e) {
    createDate ()
    title = document.getElementById ("titleNews").value;
    console.log (title)
    content = document.getElementById ("contentNews").value;
    if (document.getElementById ("titleNews").value != "" && document.getElementById ("contentNews").value != "") {
        const newNews = new NewsAdd (newsDate, title, content, randomViews(1,500));
        packNews.push (newNews);
        console.log (packNews)
        saveNews ();
    } else {
        console.log (title)
        e.preventDefault ();

    }
}; */
