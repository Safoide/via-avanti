let formEl = document.getElementById('form');
formEl.addEventListener('submit', sumbitForm);

document.addEventListener('click', documentClick);

const datos = [];

function sumbitForm(e) {
    e.preventDefault();

    let nameVl = document.getElementById('name').value;
    let surnameVl = document.getElementById('surname').value;
    let emailVl = document.getElementById('email').value;
    let messageVl = document.getElementById('textarea').value;

    datos.push({
        name: nameVl,
        surname: surnameVl,
        email: emailVl,
        message: messageVl
    });

    let firstName = nameVl.split(' ')[0];

    document.getElementById('formMessageText').innerHTML = `
        ${firstName}, Mensaje enviado exitosamente,<br>
        en aproximadamente 15 minutos te responderemos!
    `;    

    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('textarea').value = '';

    document.getElementById('formMessage').classList.add('active');

    console.log(datos);
}

function documentClick(e) {

    if(e.target.id != document.getElementById('formMessage').id) {
        document.getElementById('formMessage').classList.remove('active');
    }
}