const APIURL = "./data/data.json";

$.ajax({
    method: 'GET',
    url: APIURL,
    success: (response) => {

        response = response.filter(p => p.precio_rebajado != null);

        for(const product of response) {
        
            const productHTML = document.createElement('li');
            productHTML.classList.add('menu__item');

            productHTML.innerHTML = `
                <a class="menu__item__link descuento" href="./tienda.html#${product.id}" data-producto="${product.id}">
                    <img class="menu__item__link--img fimg" src="${product.imagenes[0]}" alt="${product.nombre.toUpperCase()} FOTO">
                    <img class="menu__item__link--img simg" src="${product.imagenes[1]}" alt="${product.nombre.toUpperCase()} FOTO">
                    <h3 class="menu__item__link--title">${product.nombre.toUpperCase()}</h3>
                    <div class="link__precio">
                        <span class="link__precio--precio descuento">$${product.precio_normal}</span>
                        <span class="link__precio--precio">$${product.precio_rebajado}</span>
                        <p class="link__precio--iva">- IVA Incluido</p>
                    </div>
                </a>
            `;
        
            $('#ofertasUl').append(productHTML);
        }
    }
})