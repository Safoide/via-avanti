const APIURL = "./data/data.json";

let clicks = 0;

const productos = [];

$.ajax({
    method: 'GET',
    url: APIURL,
    success: (response) => {
        console.log(response)
        for(const product of response) {
            const productHTML = document.createElement('li');
            productHTML.classList.add('lista__item');

            product.preciodescuento ? (
                productHTML.innerHTML = `
                    <a class="item__link descuento" href="./producto/${product.tag}.html">
                        <img class="item__link--img fimg" src="${product.principal}" alt="FOTO DEL PRODUCTO">
                        <img class="item__link--img simg" src="${product.secundaria}" alt="FOTO DEL PRODUCTO">
                        <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                        <div class="link__precio">
                            <span class="link__precio--precio descuento">$${product.precio}</span>
                            <span class="link__precio--precio">$${product.preciodescuento}</span>
                            <p class="link__precio--iva">- IVA Incluido</p>
                        </div>
                    </a>
                `
            ) : (
                productHTML.innerHTML = `
                    <a class="item__link" href="./producto/${product.tag}.html">
                        <img class="item__link--img fimg" src="${product.principal}" alt="FOTO DEL PRODUCTO">
                        <img class="item__link--img simg" src="${product.secundaria}" alt="FOTO DEL PRODUCTO">
                        <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                        <div class="link__precio">
                            <span class="link__precio--precio">$${product.precio}</span>
                            <p class="link__precio--iva">- IVA Incluido</p>
                        </div>
                    </a>
                `
            )

            $('#productosUl').append(productHTML);
        }
    }
})

$('#cargarMas').click(function(){
    if (clicks < 5)
        cargarMas();
})

function cargarMas() {
    clicks++;
    const productosEl = document.getElementById('productosUl');
    
    for(let i = 0; i < 8; i++) {
        
        let newItem = document.createElement('li');
        
        newItem.classList.add('lista__item');
        
        let randomItem = Math.floor(Math.random() * productos.length);

        productos[randomItem].preciodescuento != undefined ? (
            newItem.innerHTML = `
                <a class="item__link descuento" href="./producto/${productos[randomItem].tag}.html">
                    <img class="item__link--img fimg" src="${productos[randomItem].principal}" alt="FOTO DEL PRODUCTO">
                    <img class="item__link--img simg" src="${productos[randomItem].secundaria}" alt="FOTO DEL PRODUCTO">
                    <h3 class="item__link--title">${productos[randomItem].nombre}</h3>
                    <div class="link__precio">
                        <span class="link__precio--precio descuento">$${productos[randomItem].preciodescuento}</span>
                        <span class="link__precio--precio">$${productos[randomItem].precio}</span>
                        <p class="link__precio--iva">- IVA Incluido</p>
                    </div>
                </a>
            `
        ) : (
            newItem.innerHTML += `
                <a class="item__link" href="./producto/${productos[randomItem].tag}.html">
                    <img class="item__link--img fimg" src="${productos[randomItem].principal}" alt="FOTO DEL PRODUCTO">
                    <img class="item__link--img simg" src="${productos[randomItem].secundaria}" alt="FOTO DEL PRODUCTO">
                    <h3 class="item__link--title">${productos[randomItem].nombre}</h3>
                    <div class="link__precio">
                        <span class="link__precio--precio">$${productos[randomItem].precio}</span>
                        <p class="link__precio--iva">- IVA Incluido</p>
                    </div>
                </a>
            `
        );

        productosEl.appendChild(newItem);
    }

    if(clicks >= 5) {
        $('#cargarMas').removeClass('show');
    }
}