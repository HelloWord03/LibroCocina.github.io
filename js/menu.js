const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que el clic se propague al documento
  navLinks.classList.toggle('active');
});

// Cerrar el menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});
