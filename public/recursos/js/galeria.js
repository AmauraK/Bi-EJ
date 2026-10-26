// Galeria da equipe (/sobre-nos/): miniaturas trocam a foto principal, que abre ampliada num diálogo.
(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const photoDialog = $('.photo-dialog');
  if (!photoDialog || !$('.gallery-main')) return;

  const photoSrcset = id => [480, 960, 1600, 2400].map(width => `/fotos/img-${id}-${width}.webp ${width}w`).join(', ');
  const photos = [
    { src: '/fotos/img-4644-1600.webp', srcset: photoSrcset(4644), alt: 'Equipe trabalhando em conjunto diante de um computador', caption: 'Conhecimento que se constrói em conjunto.' },
    { src: '/fotos/img-4709-1600.webp', srcset: photoSrcset(4709), alt: 'Integrantes da EJFGV em uma reunião', caption: 'Cada conversa abre uma nova perspectiva.' },
    { src: '/fotos/img-4732-1600.webp', srcset: photoSrcset(4732), alt: 'Integrantes da equipe da EJFGV reunidos', caption: 'Gente que soma. Juntos, vamos além.' },
  ];
  let selectedPhoto = 2;
  function choosePhoto(index) {
    selectedPhoto = (index + photos.length) % photos.length;
    const photo = photos[selectedPhoto];
    $('#gallery-image').srcset = photo.srcset;
    $('#gallery-image').src = photo.src;
    $('#gallery-image').alt = photo.alt;
    $('#gallery-caption').textContent = photo.caption;
    $('#gallery-count').textContent = `0${selectedPhoto + 1} / 03`;
    $('.gallery-main').setAttribute('aria-label', `Ampliar imagem: ${photo.alt}`);
    $$('.gallery-thumbnails button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === selectedPhoto)));
    $('img', photoDialog).srcset = photo.srcset;
    $('img', photoDialog).src = photo.src;
    $('img', photoDialog).alt = photo.alt;
    $('p', photoDialog).textContent = `${selectedPhoto + 1} / 3 — ${photo.caption}`;
  }
  $$('.gallery-thumbnails button').forEach(button => button.addEventListener('click', () => choosePhoto(Number(button.dataset.photo))));
  $('.gallery-main').addEventListener('click', () => {
    choosePhoto(selectedPhoto);
    photoDialog.showModal();
    document.body.classList.add('modal-open');
  });
  $('.photo-prev').addEventListener('click', () => choosePhoto(selectedPhoto - 1));
  $('.photo-next').addEventListener('click', () => choosePhoto(selectedPhoto + 1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); choosePhoto(selectedPhoto + (event.key === 'ArrowLeft' ? -1 : 1)); }
  });
  $('.dialog-close', photoDialog).addEventListener('click', () => photoDialog.close());
  photoDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  photoDialog.addEventListener('click', event => {
    const rect = photoDialog.getBoundingClientRect();
    if (event.target === photoDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) photoDialog.close();
  });
})();
