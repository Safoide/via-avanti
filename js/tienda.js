// DEFINE VARIABLES //
const APIURL = "./data/data.json";

let clicks = 0;
let productsTotal = 0;
let productsNow = 0;

// MAIN LOAD //

loadProducts();

// MORE LOAD //

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
    $.ajax({
        method: 'GET',
        url: APIURL,
        success: (response) => {
            response = response.filter(p => p.imagenes != undefined);

            productsTotal = response.length;

            for(let i = productsNow; i < productsNow + 8; i++) {
                if (i >= productsTotal) return $('#cargarMas').removeClass('show');

                const product = response[i];
            
                const productHTML = document.createElement('li');
                productHTML.classList.add('lista__item');

                product.precio_rebajado ? (
                    productHTML.innerHTML = `
                        <a class="item__link descuento" data-producto="${product.id}">
                            <img class="item__link--img fimg" src="${product.imagenes[0]}" alt="FOTO DEL PRODUCTO">
                            <img class="item__link--img simg" src="${product.imagenes[1]}" alt="FOTO DEL PRODUCTO">
                            <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                            <div class="link__precio">
                                <span class="link__precio--precio descuento">$${product.precio_normal}</span>
                                <span class="link__precio--precio">$${product.precio_rebajado}</span>
                                <p class="link__precio--iva">- IVA Incluido</p>
                            </div>
                        </a>
                    `
                ) : (
                    productHTML.innerHTML = `
                        <a class="item__link" data-producto="${product.id}">
                            <img class="item__link--img fimg" src="${product.imagenes[0]}" alt="FOTO DEL PRODUCTO">
                            <img class="item__link--img simg" src="${product.imagenes[1]}" alt="FOTO DEL PRODUCTO">
                            <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                            <div class="link__precio">
                                <span class="link__precio--precio">$${product.precio_normal}</span>
                                <p class="link__precio--iva">- IVA Incluido</p>
                            </div>
                        </a>
                    `
                )
            
                $('#productosUl').append(productHTML);
            }

            productsNow += 8;

            $(".item__link").click((e) => {
                const item = response.filter(p => p.id == parseInt(e.target.getAttribute('data-producto')));
                
                let itemId = item[0].id;
                let itemPrecio = item[0].precio_rebajado ? item[0].precio_rebajado : item[0].precio_normal;
                let itemName = item[0].nombre;

                if(localStorage.getItem('cart-items')) {
                    const items = JSON.parse(localStorage.getItem('cart-items'));
            
                    const newitem = {
                        "id": itemId,
                        "precio": itemPrecio,
                        "producto": itemName
                    };
            
                    items.push(newitem);
            
                    localStorage.setItem('cart-items', JSON.stringify(items));
                } else {            
                    const newitem = [{
                        "id": item.id,
                        "precio": item.precio_rebajado ? item.precio_rebajado : item.precio_normal,
                        "producto": item.nombre
                    }];

                    localStorage.setItem('cart-items', JSON.stringify(newitem));
                }
            
                reloadCartCount();
            })
        }
    })
}