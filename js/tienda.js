let btnBuyDisplay

const catalog = document.querySelector ("#catalogoJuegos");
fetch ('../json/boardgames.json')   .then((res)=>res.json())
                                    .then((data) => {                                         
                                        data.forEach ((boardGame)=> {catalog.innerHTML += '<div><div class="bg-white"><div class="text-center bg-primary"><img src="../images/' + boardGame.image + '" width="200" height="150" alt="' + boardGame.name +' Box"></div><div><h6><strong>Título: </strong>' + boardGame.name + '</h6></div><div><h6><strong>Género: </strong>' + boardGame.genre + '</h6></div><div><h6><strong>Jugadores: </strong> de ' + boardGame.minPlayers + ' a ' + boardGame.maxPlayers +'</h6></div><div><h6><strong>Tiempo estimado: </strong> de ' + boardGame.time + '</h6></div><div><h6><strong>Edad: </strong>' + boardGame.age + '</h6></div><div><h6><strong>Precio: </strong> $' + boardGame.price + '</h6></div></div>' + btnBuyDisplay + '</div>'})
                                                    })

//funcion para crear o esconder el boton de Agregar articulo al carrito
function AskAccountForBuyBtn() {
    let callBtnBuy = sessionStorage.getItem ('accountAccessStorage');
    console.log (callBtnBuy);
    if (callBtnBuy) {
        btnBuyDisplay = '<button>(+) Agregar</button>';
    } else {
        btnBuyDisplay = '<button class="d-none">(+) Agregar</button>';
    };
    console.log (btnBuyDisplay);
};

AskAccountForBuyBtn();