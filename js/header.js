const dropdownEl = document.getElementById('mydropdown');
const burguerEl = document.getElementById('burguerToggle');
const burguerMenu = document.getElementById('burguerMenu');
let active = false;

dropdownEl.addEventListener('click', toggleActive);
document.addEventListener('click', documentClick);
burguerEl.addEventListener('click', burguerToggleActive);

function toggleActive() {
    dropdownEl.classList.toggle('active');
}

function documentClick(e) {
    if(e.target.id != 'mydropdown')
        dropdownEl.classList.remove('active');

    if(e.target.id != 'burguerToggle' && e.target.id != 'burguerMenu') {
        burguerMenu.classList.remove('active');
        burguerEl.classList.remove('bxs-x-circle');
        burguerEl.classList.add('bx-menu');
        active = false;
    }
}

function burguerToggleActive() {
    !active ? (
        burguerEl.classList.remove('bx-menu'),
        burguerEl.classList.add('bxs-x-circle'),
        active = true
    ) : (
        burguerEl.classList.add('bx-menu'),
        burguerEl.classList.remove('bxs-x-circle'),
        active = false
    );
    burguerMenu.classList.toggle('active');
}