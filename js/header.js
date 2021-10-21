const dropdownEl = document.getElementById('mydropdown');
const burguerEl = document.getElementById('burguerToggle');

dropdownEl.addEventListener('click', toggleActive);
document.addEventListener('click', documentClick);
burguerEl.addEventListener('click', burguerToggleActive);

function toggleActive() {
    dropdownEl.classList.toggle('active');
}

function documentClick(e) {
    if(e.target.id != 'mydropdown')
        dropdownEl.classList.remove('active');
}

function burguerToggleActive() {
    const burguerDiv = document.getElementById('burguerToggleDiv');
    burguerDiv.classList.toggle('active');
    const burguerMenu = document.getElementById('burguerMenu');
    burguerMenu.classList.toggle('active');
}