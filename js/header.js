const dropdownEl = document.getElementById('mydropdown');

dropdownEl.addEventListener('click', toggleActive);
document.addEventListener('click', documentClick);

function toggleActive() {
    dropdownEl.classList.toggle('active');
}

function documentClick(e) {
    if(e.target.id != 'mydropdown')
        dropdownEl.classList.remove('active');
}