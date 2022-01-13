const APIURL = "./data/data.json";

let clicks = 0;
let productsTotal = 0;
let productsNow = 0;

$.ajax({
    method: 'GET',
    url: APIURL,
    success: (response) => {
        response = response.filter(p => p.imagenes != undefined);

        productsTotal = response.length;

        for(let i = productsNow; i < productsNow + 16; i++) {
            const product = response[i];

            const productHTML = document.createElement('li');
            productHTML.classList.add('lista__item');

            product.precio_rebajado ? (
                productHTML.innerHTML = `
                    <a class="item__link descuento" data-producto="${product.id}">
                        <img class="item__link--img fimg" src="${product.imagenes.split(', ')[0]}" alt="FOTO DEL PRODUCTO">
                        <img class="item__link--img simg" src="${product.imagenes.split(', ')[1]}" alt="FOTO DEL PRODUCTO">
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
                        <img class="item__link--img fimg" src="${product.imagenes.split(', ')[0]}" alt="FOTO DEL PRODUCTO">
                        <img class="item__link--img simg" src="${product.imagenes.split(', ')[1]}" alt="FOTO DEL PRODUCTO">
                        <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                        <div class="link__precio">
                            <span class="link__precio--precio">$${product.precio_normal}</span>
                            <p class="link__precio--iva">- IVA Incluido</p>
                        </div>
                    </a>
                `
            )

            if (product.imagenes.split(', ')[1] == undefined) {
                console.log(product);
            }

            $('#productosUl').append(productHTML);
        }

        productsNow += 16;

        $(".item__link").click((e) => {
            console.log(e.target.getAttribute('data-producto'));
        })
    }
})

$('#cargarMas').click(function(){
    if (clicks < productsTotal / 16)
        cargarMas();
})

function cargarMas() {
    clicks++;
    
    for(let i = productsNow; i < productsNow + 16; i++) {
        $.ajax({
            method: 'GET',
            url: APIURL,
            success: (response) => {

                response = response.filter(p => p.imagenes != undefined);

                if (i >= productsTotal) return $('#cargarMas').removeClass('show');

                const product = response[i];
                
                const productHTML = document.createElement('li');
                productHTML.classList.add('lista__item');

                product.precio_rebajado ? (
                    productHTML.innerHTML = `
                        <a class="item__link descuento" data-producto="${product.id}">
                            <img class="item__link--img fimg" src="${product.imagenes.split(', ')[0]}" alt="FOTO DEL PRODUCTO">
                            <img class="item__link--img simg" src="${product.imagenes.split(', ')[1]}" alt="FOTO DEL PRODUCTO">
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
                            <img class="item__link--img fimg" src="${product.imagenes.split(', ')[0]}" alt="FOTO DEL PRODUCTO">
                            <img class="item__link--img simg" src="${product.imagenes.split(', ')[1]}" alt="FOTO DEL PRODUCTO">
                            <h3 class="item__link--title">${product.nombre.toUpperCase()}</h3>
                            <div class="link__precio">
                                <span class="link__precio--precio">$${product.precio_normal}</span>
                                <p class="link__precio--iva">- IVA Incluido</p>
                            </div>
                        </a>
                    `
                )

                if (product.imagenes.split(', ')[1] == undefined) {
                    console.log(product);
                }
                
                $('#productosUl').append(productHTML);
            }
        })
    }

    productsNow += 16;

    if(clicks >= productsTotal / 16) {
        $('#cargarMas').removeClass('show');
    }

    $(".item__link").click((e) => {
        console.log(e.target.getAttribute('data-producto'));
    })
}