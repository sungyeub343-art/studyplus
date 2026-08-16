const form = document.querySelector('#consult-form');
const toast = document.querySelector('#toast');

if (form && toast) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3500);
  });
}

document.querySelectorAll('.menu-button').forEach((button) => {
  button.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('mobile-open');
  });
});
