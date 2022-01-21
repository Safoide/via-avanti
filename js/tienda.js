// DEFINE VARIABLES //
const APIURL = "./data/data.json";

let clicks = 0;
let productsTotal = 0;
let productsNow = 0;

// MAIN LOAD //
loadProducts();

// LOAD 8 MORE ON CLICK //
$('#cargarMas').click(() => {
    if (clicks < (productsTotal - 8) / 8) {

        clicks++;

        loadProducts();

        if(clicks >= (productsTotal - 8) / 8) {
            $('#cargarMas').removeClass('show');
        }
    }
})

// MAIN FUNCTION //
function loadProducts() {

    // MAKE GET CALL //
    $.ajax({
        method: 'GET',
        url: APIURL,
        success: (response) => {

            // GET TOTAL OF PRODUCTS //
            productsTotal = response.length;

            // LOAD FIRST 8 PRODUCTS //
            for(let i = productsNow; i < productsNow + 8; i++) {
                if (i >= productsTotal) return $('#cargarMas').removeClass('show');

                const product = response[i];

                // CREATE 'li' ELEMENT //
                const productHTML = document.createElement('li');

                // ADD CLASS TO THE ELEMENT //
                productHTML.classList.add('lista__item');

                // CHECK IF PRODUCT IS ON DISCOUNT //
                product.precio_rebajado ? (
                    productHTML.innerHTML = `
                        <a class="item__link descuento" id="${product.id}">
                            <img class="item__link--img fimg" src="${product.imagenes[0]}" alt="${product.nombre.toUpperCase()} FOTO">
                            <img class="item__link--img simg" src="${product.imagenes[1]}" alt="${product.nombre.toUpperCase()} FOTO">
                            <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                            <div class="link__precio">
                                <span class="link__precio--precio descuento">$${product.precio_normal}</span>
                                <span class="link__precio--precio">$${product.precio_rebajado}</span>
                                <p class="link__precio--iva">- IVA Incluido</p>
                            </div>
                            <button class="link--boton" data-producto="${product.id}">AÑADIR AL CARRITO</button>
                        </a>
                    `
                ) : (
                    productHTML.innerHTML = `
                        <a class="item__link" id="${product.id}">
                            <img class="item__link--img fimg" src="${product.imagenes[0]}" alt="${product.nombre.toUpperCase()} FOTO">
                            <img class="item__link--img simg" src="${product.imagenes[1]}" alt="${product.nombre.toUpperCase()} FOTO">
                            <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                            <div class="link__precio">
                                <span class="link__precio--precio">$${product.precio_normal}</span>
                                <p class="link__precio--iva">- IVA Incluido</p>
                            </div>
                            <button class="link--boton" data-producto="${product.id}">AÑADIR AL CARRITO</button>
                        </a>
                    `
                )
            
                // APPEND THE ELEMENT TO THE 'ul' ELEMENT //
                $('#productosUl').append(productHTML);
            }

            productsNow += 8;

            $(".link--boton").click((e) => {
                let productoid = parseInt(e.target.getAttribute('data-producto'));
                const item = response.filter(p => p.id == productoid);
                
                let itemId = item[0].id;
                let itemImg = item[0].imagenes[0];
                let itemPrecio = item[0].precio_rebajado ? item[0].precio_rebajado : item[0].precio_normal;
                let itemName = item[0].nombre.toUpperCase();

                if(localStorage.getItem('cart-items')) {
                    const items = JSON.parse(localStorage.getItem('cart-items'));

                    let itemindex = items.findIndex(index => index.id == productoid);

                    if(itemindex != -1) {
                        if(items[itemindex].cantidad >= 10) return;
                        items[itemindex].cantidad += 1;
                    } else {
                        const newitem = {
                            "id": itemId,
                            "imagen": itemImg,
                            "precio": itemPrecio,
                            "producto": itemName,
                            "cantidad": 1
                        };

                        items.push(newitem);
                    }
            
                    localStorage.setItem('cart-items', JSON.stringify(items));
                } else {            
                    const newitem = [{
                        "id": itemId,
                        "imagen": itemImg,
                        "precio": itemPrecio,
                        "producto": itemName,
                        "cantidad": 1
                    }];

                    localStorage.setItem('cart-items', JSON.stringify(newitem));
                }
            
                reloadCartCount();
                $('#cartMessage').addClass('show');
            })
        }
    })
}

$('#seguirComprando').click(() => {
    $('#cartMessage').removeClass('show');
})
