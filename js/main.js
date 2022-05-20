//variable booleana para acreditar el acceso a cuenta
let accountAccess;

//función para creación de cuentas (objetos)
function account (user, pass) {
    this.user = user;
    this.pass = pass;
}

//Objeto creado para cuenta de administrador
const admin = {user: "admin", pass: "admin"};

//se añade el objeto admin a un nuevo array
const listOfUsers = [admin];

//se crean las variables necesarias para la creación o el ingreso a la cuenta
let buttonCreateAccount = document.getElementById ("createAccountBtn");
let username;
let password;
let users;

//función del botón para crear cuenta
buttonCreateAccount.addEventListener ("click", createAccount);
function createAccount () {
    username = document.getElementById ("inputUser").value;
    password = document.getElementById ("inputPassword").value;

    if ((document.getElementById ("inputUser").value == "" || document.getElementById ("inputPassword").value == "")||(username.value == "" || password.value == "")) {
        swal.fire ({    title:'Dato no ingresado',
                        text: 'Deberá ingresar algún dato del usuario y/o contraseña',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        background: '#fff0f0',
                        position: 'top-end'

        })
    } else {
        swal.fire ({    title:'Cuenta creada',
                        text: 'USUARIO: ' + username + ', CONTRASEÑA: ' + password,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        background: '#f0fff0',
                        position: 'top-end'

        })
        users = new account (username, password);
        listOfUsers.push (users);
        sessionStorage.setItem ('listOfUsersJSON', JSON.stringify (listOfUsers));
    }  
}

//función del botón para logearse
let buttonLogin = document.getElementById ("loginBtn")
buttonLogin.addEventListener ("click", loginAccount);
function loginAccount (e) {
    username = document.getElementById ("inputUser").value;
    password = document.getElementById ("inputPassword").value;

    if (username == "admin" && password == "admin") {
        sessionStorage.setItem ('adminAccount', true);
    }

    for (const validUser of listOfUsers) {
        if (username == validUser.user && password == validUser.pass) {
            accountAccess = true;
            sessionStorage.setItem ('accountAccessStorage', true);
            sessionStorage.setItem ('userJSONKey', JSON.stringify (validUser)); //se guarda el usuario ingresante
        }
    }

    while (accountAccess == null) {
        swal.fire ({    title:'Algo está mal',
                        text: 'Verifica el Usuario y/o la Contraseña que son inválidas',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        position: 'top-end'

        });
        e.preventDefault();
        break;
    }
}

//variable para mostrar el alerta de bienvenida una sola vez iniciada la sesión
let alertWelcome = sessionStorage.getItem ('inactiveAlertWelcome');
//función para leer las cuentas guardadas
function askAccounts() {
    let access = sessionStorage.getItem ('accountAccessStorage');
    if (access = true) {
        const userAccessJSON = JSON.parse (sessionStorage.getItem ('userJSONKey')); //se obtiene quien es el usuario ingresante
        //doy la bienvenida al usuario por única vez
        if (alertWelcome == null) {
            swal.fire ({    title:'Entraste a tu cuenta',
                            text: 'Bienvenido/a ' + userAccessJSON.user,
                            confirmButtonText: 'Gracias!',
                            position: 'top-end'
                        });
            alertWelcomeDesactivate ();
        }
        document.getElementById ("formAccount").innerHTML = '<h6>Bienvenido ' + userAccessJSON.user + '!</h6>';
    }
}

//funcion para activar una sola vez el alerta de bienvenido a la cuenta y deshabilitarla luego
function alertWelcomeDesactivate () {
    sessionStorage.setItem ('inactiveAlertWelcome', false);
}

//consulto si tengo valores guardados en el Storage
askAccounts ()

/////////////////////falta agregar el cierre de sesión/////////////////////////