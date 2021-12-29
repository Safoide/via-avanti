const cargarMasEl = document.getElementById('cargarMas');

let clicks = 0;

const productos = [
    {
        'principal': './imgs/popis/popis1.jpg',
        'secundaria': './imgs/popis/popis2.jpg',
        'nombre': 'SWEATER POPIS',
        'preciodescuento': '2600',
        'precio': '2340',
        'tag': 'sweater-popis'
    },
    {
        'principal': './imgs/chicago/chicago1.jpg',
        'secundaria': './imgs/chicago/chicago2.jpg',
        'nombre': 'PANTALON CHICAGO',
        'precio': '3280',
        'tag': 'pantalon-chicago'
    },
    {
        'principal': './imgs/mari/mari1.jpg',
        'secundaria': './imgs/mari/mari2.jpg',
        'nombre': 'SWEATER MARI',
        'preciodescuento': '3290',
        'precio': '2960',
        'tag': 'sweater-mari'
    },
    {
        'principal': './imgs/leonardo/leonardo1.jpg',
        'secundaria': './imgs/leonardo/leonardo2.jpg',
        'nombre': 'BABUCHA LEONARDO',
        'precio': '3021',
        'tag': 'babucha-leonardo'
    },
    {
        'principal': './imgs/female/female1.jpg',
        'secundaria': './imgs/female/female2.jpg',
        'nombre': 'REMERA FEMALE',
        'precio': '1690',
        'tag': 'remera-female'
    },
    {
        'principal': './imgs/rembrandt/rembrandt1.jpg',
        'secundaria': './imgs/rembrandt/rembrandt2.jpg',
        'nombre': 'REMERA REMBRANDT',
        'precio': '2070',
        'tag': 'remera-rembrandt'
    }
];

$('#cargarMas').click(function(){
    if (clicks < 5)
        cargarMas();
})

function cargarMas() {
    clicks++;
    const productosEl = document.getElementById('productosUl');
    
    for(let i = 0; i < 8; i++) {

        let randomItem = Math.floor(Math.random() * 6);

        let newItem = document.createElement('li');

        newItem.classList.add('lista__item');

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
        cargarMasEl.classList.remove('show');
    }
}