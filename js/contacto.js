let askName = prompt('Cual es tu nombre?');
document.getElementById('name').value = askName;

let askSurname = prompt('Cual es tu apellido?');
document.getElementById('surname').value = askSurname;

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

    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('textarea').value = '';

    document.getElementById('formMessage').classList.add('active');

    console.log(datos);
}