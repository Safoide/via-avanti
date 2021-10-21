const cargarMasEl = document.getElementById('cargarMas');
let clicks = 0;
const imagenesSrc = {
    'sweater-popis': {
        'principal': './imgs/popis/popis1.jpg',
        'secundaria': './imgs/popis/popis2.jpg',
        'nombre': 'SWEATER POPIS',
        'precio': '2340'
    },
    'pantalon-chicago': {
        'principal': './imgs/chicago/chicago1.jpg',
        'secundaria': './imgs/chicago/chicago2.jpg',
        'nombre': 'PANTALON CHICAGO',
        'precio': '3280'
    },
    'sweater-mari': {
        'principal': './imgs/mari/mari1.jpg',
        'secundaria': './imgs/mari/mari2.jpg',
        'nombre': 'SWEATER MARI',
        'precio': '2960'
    },
    'babucha-leonardo': {
        'principal': './imgs/leonardo/leonardo1.jpg',
        'secundaria': './imgs/leonardo/leonardo2.jpg',
        'nombre': 'BABUCHA LEONARDO',
        'precio': '3021'
    },
    'remera-female': {
        'principal': './imgs/female/female1.jpg',
        'secundaria': './imgs/female/female2.jpg',
        'nombre': 'REMERA FEMALE',
        'precio': '1690'
    },
    'remera-rembrandt': {
        'principal': './imgs/rembrandt/rembrandt1.jpg',
        'secundaria': './imgs/rembrandt/rembrandt2.jpg',
        'nombre': 'REMERA REMBRANDT',
        'precio': '2070'
    }
};

cargarMasEl.addEventListener('click', function (err) {
    if (clicks < 5)
        cargarMas();
});

function cargarMas() {
    clicks++;
    const productosEl = document.getElementById('productosUl');
    var productos = ['sweater-popis', 'pantalon-chicago', 'sweater-mari', 'babucha-leonardo', 'remera-female', 'remera-rembrandt'];
    
    for(let i = 0; i < 8; i++) {
        var producto = productos[Math.floor(Math.random()*productos.length)];

        productosEl.innerHTML += `
            <li class="lista__item">
                <a class="item__link" href="./producto/${producto}.html">
                    <img class="item__link--img fimg" src="${imagenesSrc[producto]['principal']}" alt="FOTO DEL PRODUCTO">
                    <img class="item__link--img simg" src="${imagenesSrc[producto]['secundaria']}" alt="FOTO DEL PRODUCTO">
                    <h3 class="item__link--title">${imagenesSrc[producto]['nombre']}</h3>
                    <div class="link__precio">
                        <span class="link__precio--precio">$${imagenesSrc[producto]['precio']}</span>
                        <p class="link__precio--iva">- IVA Incluido</p>
                    </div>
                </a>
            </li>
        `;
    }

    if(clicks >= 5) {
        cargarMasEl.classList.remove('show');
    }
}