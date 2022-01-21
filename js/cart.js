let cartItems = localStorage.getItem('cart-items');

if(cartItems) {
    cartItems = JSON.parse(cartItems);

    loadItems();
} else {
    $('#tableBody').html(`
        <tr>
            <th class="row__vacio" colspan="4"><h4>Tu carrito está vacío.</h4></th>
        </tr>
        <th class="row__vacio" colspan="4">
            <a class="tiendaButton" href="./tienda.html">IR A LA TIENDA</a>
        </th>
    `);
}

function loadItems() {
    $('#tableBody').empty();

    cartItems.forEach(producto => {
        let newItem = document.createElement('tr');
        newItem.classList.add('body__row');

        newItem.innerHTML = `
            <th class="row__item">
                <div class="item__productoInfo">
                    <i class='bx bxs-x-circle' data-producto="${producto.id}"></i>
                    <a class="productoInfo__link">
                        <img class="productoInfo__link--img" src="${producto.imagen}" alt="${producto.producto} FOTO">
                        <span class="productoInfo__link--title">${producto.producto}</span>
                    </a>   
                </div>       
            </th>
            <th class="row__item">
                <span class="row__item--precio" data-precio>$${producto.precio}</span>
            </th>
            <th class="row__item">
                <div class="item__unidades">
                    <button class="item__unidades--boton" data-restarButton="${producto.id}"></button>
                    <h4 class="item__unidades--cantidad" data-unidades id="${producto.id}">${producto.cantidad}</h4>
                    <button class="item__unidades--boton sumar" data-sumarButton="${producto.id}"></button>
                </div>
            </th>
            <th class="row__item">
                <span class="row__item--subtotal" data-subtotal></span>
            </th>
        `;

        $('#tableBody').append(newItem);
    })

    $('.bxs-x-circle').click((e) => {
        let producto = parseInt(e.target.getAttribute('data-producto'));
    
        cartItems = cartItems.filter(p => p.id != producto);

        if(cartItems.length == 0) {
            localStorage.removeItem('cart-items');
            $('#tableBody').html(`
                <tr>
                    <th class="row__vacio" colspan="4"><h4>Tu carrito está vacío.</h4></th>
                </tr>
                <th class="row__vacio" colspan="4">
                    <a class="tiendaButton" href="./tienda.html">IR A LA TIENDA</a>
                </th>
            `);
        } else {
            localStorage.setItem('cart-items', JSON.stringify(cartItems));
            loadItems();
        }
    
    })

    for(let i = 0; i < cartItems.length; i++) {
        let unidades = cartItems[i].cantidad;

        let restarButton = document.querySelectorAll('[data-restarButton]');
        let sumarButton = document.querySelectorAll('[data-sumarButton]');

        if(unidades <= 1) {
            restarButton[i].disabled = true;
        } else if(unidades >= 10) {
            sumarButton[i].disabled = true;
        }
    }

    recargarTotal(document.querySelectorAll('[data-subtotal]'));

    $('[data-restarButton]').click((e) => {
        const target = e.target;
        let targetId = target.getAttribute('data-restarButton');
        const sibling = e.target.nextElementSibling;

        let unidades = parseInt($(`#${targetId}`).text());

        unidades--;
        
        if(unidades <= 1)
            target.disabled = true;

        recargarBoton(sibling, unidades);
        recargarUnidades(targetId, unidades);
        recargarTotal(document.querySelectorAll('[data-subtotal]'));
    });

    $('[data-sumarButton]').click((e) => {
        const target = e.target;
        let targetId = target.getAttribute('data-sumarButton');
        const sibling = e.target.previousElementSibling;
    
        let unidades = parseInt($(`#${targetId}`).text());
        
        unidades++;
    
        if(unidades >= 10)
            target.disabled = true;

        recargarBoton(sibling, unidades);
        recargarUnidades(targetId, unidades);
        recargarTotal(document.querySelectorAll('[data-subtotal]'));
    });
}

function recargarBoton(sibling, unidades) {

    if(unidades < 10) {
        sibling.nextElementSibling.disabled = false;
    }
    if(unidades > 1) {
        sibling.previousElementSibling.disabled = false;
    }
}

function recargarUnidades(targetId, unidades) {
    $(`#${targetId}`).text(unidades);

    let index = cartItems.findIndex(p => p.id == targetId);

    cartItems[index].cantidad = unidades;

    localStorage.setItem('cart-items', JSON.stringify(cartItems));
}

function recargarTotal(subtotalesEl) {
    let totalNuevo = 0;
    let totalesNuevos = [];
    let envio = 300;

    for(let i = 0; i < cartItems.length; i++) {
        totalesNuevos.push(cartItems[i].precio * cartItems[i].cantidad);
        subtotalesEl[i].innerText = `$${totalesNuevos[i]}`;
        totalNuevo += totalesNuevos[i];
    }

    $('#subtotal').text(`$${totalNuevo}`);
    $('#total').text(`$${totalNuevo+envio}`);
}