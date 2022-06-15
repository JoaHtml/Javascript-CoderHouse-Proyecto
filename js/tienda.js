let btnBuyDisplayPart1
let btnBuyDisplayPart2

const packOfBoardGames = [];

const catalog = document.querySelector ("#catalogoJuegos");
fetch ('../json/boardgames.json')   .then((res)=>res.json())
                                    .then((data) => {                                         
                                        data.forEach ((boardGame)=> {catalog.innerHTML += '<div><div class="bg-white"><div class="text-center bg-primary"><img src="../images/' + boardGame.image + '" width="200" height="150" alt="' + boardGame.name +' Box"></div><div><h6><strong>Título: </strong>' + boardGame.name + '</h6></div><div><h6><strong>Género: </strong>' + boardGame.genre + '</h6></div><div><h6><strong>Jugadores: </strong> de ' + boardGame.minPlayers + ' a ' + boardGame.maxPlayers +'</h6></div><div><h6><strong>Tiempo estimado: </strong> de ' + boardGame.time + '</h6></div><div><h6><strong>Edad: </strong>' + boardGame.age + '</h6></div><div><h6><strong>Precio: </strong> $' + boardGame.price + '</h6></div></div id="addCart' + boardGame.pos + '">' + btnBuyDisplayPart1 + boardGame.id + btnBuyDisplayPart2 + '</div>'; packOfBoardGames.push (boardGame);})
                                                    })

console.log (packOfBoardGames);

//funcion para crear o esconder el boton de Agregar articulo al carrito
function askAccountForBuyBtn() {
    let callBtnBuy = sessionStorage.getItem ('accountAccessStorage');
    console.log (callBtnBuy);
    if (callBtnBuy) {
        btnBuyDisplayPart1 = '<button class="btn btn-primary" id="btnAddCart';
        btnBuyDisplayPart2 = '">(+) Agregar</button>';
    } else {
        btnBuyDisplayPart1 = '<button class="d-none" id="'
        btnBuyDisplayPart2 = '">(+) Agregar</button>';
        document.getElementById ('listShopCart').innerHTML = "";
    };
};

askAccountForBuyBtn();

//preguntar que usuario ingresó para cargar carrito de compras
let callWhatUser;
function askWhatUser () {
    callWhatUser = JSON.parse (sessionStorage.getItem ('userJSONKey'));
    console.log (callWhatUser.user);
}

askWhatUser ();

//cargando si el usuario tiene carrito de compra cargado
let shopCart;
let shopCartLoaded = JSON.parse (localStorage.getItem ('shopCart'+callWhatUser.user+'LS'));

shopCartLoaded ? shopCart = shopCartLoaded : shopCart = [];

function ShopCartConstructor (image, name, price, id) {
    this.image = image;
    this.name = name;
    this.price = price;
    this.id = id;
};

let productShopCart
let clickCounter = 0;
let sectionTableProducts = document.getElementById ('tableBodyBuy');
let totalPrice = document.getElementById ('totalPrice');
document.addEventListener("click", (e)=>{
    packOfBoardGames.forEach ((packsBG)=>{
        if(e.target.id == 'btnAddCart' +  packsBG.id + ''){
            clickCounter = clickCounter + 1;
            console.log (clickCounter);
            productShopCart = new ShopCartConstructor (packsBG.image, packsBG.name, packsBG.price, clickCounter);
            console.log(productShopCart);
            shopCart.push (productShopCart);
            console.log ('click');
            console.log (shopCart);
            localStorage.setItem ('shopCart'+callWhatUser.user+'LS', JSON.stringify(shopCart));
        }
    })
});

//funcion para agregar productos al carrito de compras
function loadShopCart () {
    let checkShopCart = JSON.parse (localStorage.getItem ('shopCart'+callWhatUser.user+'LS'));
    sectionTableProducts.innerHTML = "";
    let total = 0;
    totalPrice.innerHTML = "";
    if (checkShopCart.length != 0) {
        for (const shopCartIterator of shopCart) {
            sectionTableProducts.innerHTML += '<td><img src="../images/' + shopCartIterator.image + '" width="50" height="40" alt="' + shopCartIterator.name +' BoxPreview"></td><td>' + shopCartIterator.name + '</td><td>$' + shopCartIterator.price + '</td><td><button class="btn btn-danger" id="deleteBG' + shopCartIterator.id + '">[X]</button></td>';
            total += shopCartIterator.price;
            totalPrice.innerHTML = '$' + total;
        };
    } else {
        sectionTableProducts.innerHTML = "<p class='text-center p-3'>No se encontraron productos seleccionados!</p>";
    }
};

//eliminar cada producto
function removeItemSC (e) {

    for (const removingShopCartIterator of shopCart) {
        if(e.target.id == 'deleteBG' +  removingShopCartIterator.id + ''){
            console.log('eliminado' + removingShopCartIterator.id);
            let indexRemoveProduct = shopCart.indexOf (removingShopCartIterator);
            shopCart.splice (indexRemoveProduct, 1);
        }
    }
    localStorage.setItem ('shopCart'+callWhatUser.user+'LS', JSON.stringify(shopCart));
    loadShopCart ();
};

//cada vez que se haga un click para agregar o eliminar un producto se renueva la lista del carrito de compras
document.addEventListener("click", (e)=>{ loadShopCart (); removeItemSC (e)});

//al cargar la página cargar la lista del carrito de compras si la hay
loadShopCart ();

//eliminar todo el carrito
document.getElementById ('deleteAllBoardGames').addEventListener ('click', ()=>{
    let checkShopCart = JSON.parse (localStorage.getItem ('shopCart'+callWhatUser.user+'LS'));
    if (checkShopCart.length != 0) {
        swal.fire ({    title:'¿Estás seguro/a de querer eliminar todo el carrito?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, estoy seguro/a',
                        cancelButtonText: 'No, me equivoqué',
                        position: 'top-end'
                    }) .then((result)=>{
                                            if (result.isConfirmed) {
                                                shopCart = [];
                                                localStorage.setItem ('shopCart'+callWhatUser.user+'LS', JSON.stringify(shopCart));
                                            }
                                        })
    } else {
        swal.fire ({    title:'Carrito de compras vacío',
                        text: 'Agrega cualquier producto antes de querer vaciarlo',
                        confirmButtonText: 'Ups, ok!',
                        background: '#fff0f0',
                        position: 'top-end'
    
        })
    }
});

//sweet alert al comprar
document.getElementById ('buyBoardGames').addEventListener ('click', ()=>{
    //chequear si existe listado de productos para comprar
    let checkShopCart = JSON.parse (localStorage.getItem ('shopCart'+callWhatUser.user+'LS'));
    console.log (checkShopCart.length);
    if (checkShopCart.length != 0) {
        //si el usuario es admin solo es para prueba
        let callIfAdmin = sessionStorage.getItem ('adminAccount')
        if (callIfAdmin) {
            swal.fire ({title:'Prueba exitosa Admin',
                        text: 'Si estabas probando como funciona la tienda quedate tranqui que anda todo bien pero si quieres adquirir un producto ve al deposito vago',
                        icon: 'success',
                        confirmButtonText: 'Ok :(',
                        background: '#f0fff0',
                        position: 'top-end'

            })
            shopCart = [];
            localStorage.setItem ('shopCart'+callWhatUser.user+'LS', JSON.stringify(shopCart));
            loadShopCart ();
        //si el usuario no es admin puede comprar
        } else {
            swal.fire ({title:'¡Compra exitosa!',
                        text: 'Gracias por tu confianza',
                        icon: 'success',
                        confirmButtonText: '¡Genial!',
                        background: '#f0fff0',
                        position: 'top-end'

            })
            shopCart = [];
            localStorage.setItem ('shopCart'+callWhatUser.user+'LS', JSON.stringify(shopCart));
            loadShopCart ();
        }
    //si no existe listado de productos no deja comprar
    } else {
        swal.fire ({    title:'Carrito de compras vacío',
                        text: 'Agrega cualquier producto para poder efectuar la compra',
                        confirmButtonText: '¡Dale!',
                        background: '#fff0f0',
                        position: 'top-end'
    
        })
    }
    
})