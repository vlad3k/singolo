document.addEventListener('DOMContentLoaded', function(){

  // Scroll to section
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

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkTo = document.querySelector(e.target.getAttribute('href')).offsetTop - 95;
      window.scroll({
        top: linkTo,
        left: 0,
        behavior: 'smooth'
      });
    })
  });

  // Slider
  let items = document.querySelectorAll('.carousel__slide'),
      currentItem = 0,
      isEnabled = true,
      slider = document.querySelector('#slider'),
      prev = document.querySelector('#prev'),
      next = document.querySelector('#next');

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('carousel__slide--active', direction);
    });
  }

  function showItem(direction) {
    if (items[currentItem].dataset.area === 'bg') {
      slider.style.background = '#648BF0';
    } else {
      slider.style.background = '#F06C64';
    }
    items[currentItem].classList.add('carousel__slide--next', direction);
    items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('carousel__slide--next', direction);
      this.classList.add('carousel__slide--active');
      isEnabled = true;
    });
  }

  function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
  }

  function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
  }

  prev.addEventListener('click', function () {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

  next.addEventListener('click', function () {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });


  // Power off/on phones on slider
  const phones = document.querySelectorAll('.phone__img-area');
  phones.forEach(phone => phone.addEventListener('click', () => {
    phone.classList.toggle('phone__img-area--power-off');
  }));

  // gallery filter
  const tags = document.querySelectorAll('.tags__item');
  const images = document.querySelectorAll('.gallery__image');

  const makeActiveTag = (tag) => tag.classList.add('tags__item--active');
  const removeActiveTags = () => tags.forEach(tag => removeActiveTag(tag));
  const removeActiveTag = (tag) => tag.classList.remove('tags__item--active');


  tags.forEach(tag => tag.addEventListener('click', function(e) {
    removeActiveTags();
    makeActiveTag(e.target);
    filterContent(e.target.dataset.area);
  }));


  function filterContent(group) {
    if (group === 'all') {
      images.forEach(image => image.classList.add('gallery__image--show'));
    } else {
      images.forEach(image => image.classList.remove('gallery__image--show'));
      const imagesByGroup = document.querySelectorAll(`.${group}`);
      imagesByGroup.forEach(image => image.classList.add('gallery__image--show'));
    }
  }

  // Active portfolio image
  images.forEach(image => image.addEventListener('click', function() {
    if (image.classList.contains('gallery__image--active')) return;
    images.forEach(image => image.classList.remove('gallery__image--active'));
    this.classList.add('gallery__image--active');
  }))

  // Form modal
  const form = document.querySelector('.section__form');
  const modal = document.querySelector("#myModal");
  const close = document.querySelector(".modal__close");
  const modalSubject = document.querySelector('#subject');
  const modalDescription = document.querySelector('#description');
  const subject = form.subject;
  const desc = form.description;


  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (subject.value.trim() === '') {
      modalSubject.innerHTML = 'Без темы';
    } else {
      modalSubject.innerHTML = `<div class="modal__title">Тема:</div> ${subject.value}`;
    }
    if (desc.value.trim() === '') {
      modalDescription.innerHTML = 'Без описания';
    } else {

      modalDescription.innerHTML = `<div class="modal__title">Описание:</div> ${desc.value}`;
    }
    modal.style.display = 'block';
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      modalSubject.innerHTML = 'Без темы';
      modalDescription.innerHTML = 'Без описания';
    }
  }

  close.onclick = function() {
    modal.style.display = 'none';
    modalSubject.innerHTML = 'Без темы';
    modalDescription.innerHTML = 'Без описания';
  }
});


