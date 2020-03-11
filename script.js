document.addEventListener('DOMContentLoaded', function(){

  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section');
  const sectionMargin = 300;

  const makeActive = (link) => navLinks[link].classList.add('nav__link--active');
  const removeActive = (link) => navLinks[link].classList.remove('nav__link--active');
  const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

  let currentActive = 0;

  window.addEventListener('scroll', () => {
    const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1;
    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      makeActive(current);
    }
  });

});
