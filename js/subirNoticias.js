function randomViews(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let addPackNews = JSON.parse(localStorage.getItem ('packOfNews'));

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
  let titleCapture = document.getElementById ("titleNews").value;
  let contentCapture = document.getElementById ("contentNews").value;
  
  function AddNews (fecha, titular, contenido, views) {
      this.fecha = fecha;
      this.titular = titular;
      this.contenido = contenido;
      this.views = views;
  }
  
  newNews = new AddNews (luxon.DateTime.local().toLocaleString(), titleCapture.toUpperCase (), contentCapture, randomViews(1,500));
  document.getElementById ('prevNews').innerHTML = "";
  agregar ();
  location.reload();
}

function agregar () {
  addPackNews.push (newNews);
  localStorage.setItem ('packOfNews', JSON.stringify(addPackNews));
}


function previsualNews () {
  let titleCaptureNow = document.getElementById ("titleNews").value;
  let contentCaptureNow = document.getElementById ("contentNews").value;
  document.getElementById ('prevNews').innerHTML = '<div class="col"><img src="../images/novedadWeb.jpg" alt="breaking news image" width="200px"><div><h6>' + luxon.DateTime.local().toLocaleString() + "</h6></div><div><h3>" + titleCaptureNow.toUpperCase() + '</h3></div><div class="maxWidthNews"><h5>' + contentCaptureNow + '</h5></div><div class="d-flex align-items-center justify-content-center"><img src="../images/view.png" alt="views icon"><h6 class="viewsMargin"> ' + randomViews(1,500) + '</h6></div></div>';

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
