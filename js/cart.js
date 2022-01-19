const totalEl = document.getElementById('total');
const subtotalEl = document.getElementById('subtotal');
const preciosEl = document.querySelectorAll('[data-precio]');
const subtotalesEl = document.querySelectorAll('[data-subtotal]');
const unidadesEl = document.querySelectorAll('[data-unidades]');

let total = 0;
let envio = 300;

const totales = [];

for(let i = 0; i < preciosEl.length; i++) {
    totales.push(parseInt(preciosEl[i].innerText.replace('$', '')) * parseInt(unidadesEl[i].innerText));
    total += totales[i];
}

subtotalEl.innerText += ` $${total}`;
totalEl.innerText += ` $${total+envio}`;

function restarUnidad(e) {
    const target = e.target;
    const sibling = e.target.nextElementSibling;

    let unidades = parseInt(sibling.innerText);

    unidades--;
    
    if(unidades <= 1) {
        unidades = 1;
        target.disabled = true;
    }

    sibling.innerText = unidades;
    recargarBoton(sibling, unidades);
    recargarTotal();
};

function sumarUnidad(e) {
    const target = e.target;
    const sibling = e.target.previousElementSibling;

    let unidades = parseInt(sibling.innerText);
    
    unidades++;

    if(unidades >= 10) {
        unidades = 10;
        target.disabled = true;
    }


    sibling.innerText = unidades;
    recargarBoton(sibling, unidades);
    recargarTotal();
}

function recargarBoton(sibling, unidades) {
    if(unidades < 10) {
        sibling.nextElementSibling.disabled = false;
    }
    if(unidades > 1) {
        sibling.previousElementSibling.disabled = false;
    }
}

function recargarTotal() {
    let totalNuevo = 0;
    let totalesNuevos = [];

    for(let i = 0; i < preciosEl.length; i++) {
        totalesNuevos.push(parseInt(preciosEl[i].innerText.replace('$', '')) * parseInt(unidadesEl[i].innerText));
        subtotalesEl[i].innerText = `$${totalesNuevos[i]}`;
        totalNuevo += totalesNuevos[i];
    }

    subtotalEl.innerText = `$${totalNuevo}`;
    totalEl.innerText = `$${totalNuevo+envio}`;
}
