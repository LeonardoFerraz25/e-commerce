const openCart = document.querySelector('#openCart');

openCart.addEventListener('click', () => {
  document.querySelector('.container-cartTitle').classList.toggle('show-title');
  openCart.classList.toggle('visible');
});