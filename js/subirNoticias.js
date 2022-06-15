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
