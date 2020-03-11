const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('nav__link--active')) return;
    navLinks.forEach(link => link.classList.remove('nav__link--active'));
    const linkTo = document.querySelector(e.target.getAttribute('href')).offsetTop - 95;
    e.target.classList.add('nav__link--active');
    window.scroll({
      top: linkTo,
      left: 0,
      behavior: 'smooth'
    });
  })
});
