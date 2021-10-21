const RestarButton = document.getElementById('restarButton');
const SumarButton = document.getElementById('sumarButton');
const UnidadesEl = document.getElementById("unidades");
const cartUnidadesEl = document.getElementById('cartUnidades');
const coloresEl = document.querySelectorAll('[data-colores]');
const imgsEl = document.querySelectorAll('[data-imgs]');

const coloresSrc = {
    'popis': { 
        'coral': '../imgs/popis/popis1.jpg',
        'orquidea': '../imgs/popis/popis2.jpg',
        'celeste': '../imgs/popis/popis3.jpg'
    },
    'chicago': {
        'beige': '../imgs/chicago/chicago1.jpg',
        'mostaza': '../imgs/chicago/chicago1.jpg'
    },
    'rembrandt': {
        'camel': '../imgs/rembrandt/rembrandt1.jpg',
        'grismelange': '../imgs/rembrandt/rembrandt1.jpg',
        'negro': '../imgs/rembrandt/rembrandt1.jpg'
    },
    'female': {
        'crudo': '../imgs/female/female1.jpg'
    },
    'mari': {
        'fucsia': '../imgs/mari/mari1.jpg',
        'celeste': '../imgs/mari/mari2.jpg'
    },
    'leonardo': {
        'crudo': '../imgs/leonardo/leonardo1.jpg',
        'grismelange': '../imgs/leonardo/leonardo1.jpg'
    }
};


let unidades = UnidadesEl.value;

coloresEl.forEach(color => {
    color.addEventListener('click', recargarColor);
});

imgsEl.forEach(img => {
    img.addEventListener('click', recargarFoto);
});

function RestarUnidad(e) {
    e.preventDefault();

    unidades = UnidadesEl.value;
    unidades--;

    if(unidades <= 1) {
        unidades = 1;
        RestarButton.disabled = true;
    }

    UnidadesEl.value = unidades;
    disableButtons();
}

function SumarUnidad(e) {
    e.preventDefault();

    unidades = UnidadesEl.value;
    unidades++;

    if(unidades >= 10) {
        unidades = 10;
        SumarButton.disabled = true;
    }

    UnidadesEl.value = unidades;
    disableButtons();
}

function disableButtons() {    
    unidades = UnidadesEl.value;

    if(unidades > 1) {
        RestarButton.disabled = false;
    } else {
        RestarButton.disabled = true;
    }
    
    if (unidades < 10) {
        SumarButton.disabled = false;
    } else {
        SumarButton.disabled = true;
    }
}

function AddToCart() {
    cartUnidadesEl.innerText = unidades;
    cartUnidadesEl.classList.add('show');
}

function recargarColor(event) {
    let target = event.srcElement.dataset['colores'];
    let targetId = event.target.id;
    let fileSrc = coloresSrc[target][targetId];
    const imgEl = document.getElementById('productImg');

    imgEl.src = fileSrc;
}

function recargarFoto(event) {
    let targetSrc = event.target.src;
    const imgEl = document.getElementById('productImg');

    imgEl.src = targetSrc;
}