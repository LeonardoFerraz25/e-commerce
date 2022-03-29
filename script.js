const openCart = document.querySelector('#openCart');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const slider = document.querySelector('.scroll');
const cart = document.querySelector('.carrinho');
const containerProducts = document.querySelector('.items');
const lupa = document.querySelector('#searchItem');
let scrollAmount = 0;

openCart.addEventListener('click', () => {
  document.querySelector('.container-cartTitle').classList.toggle('show-title');
  openCart.classList.toggle('visible');
  cart.classList.toggle('show-cart');
});

backward.addEventListener('click', () => {
  slider.scrollTo({
    top: 0 ,
    left: (scrollAmount -= 1000),
    behavior: "smooth"
  });
  if (scrollAmount < 0) {
    scrollAmount = 0
  }
})

forward.addEventListener('click', () => {
  if(scrollAmount <= slider.scrollWidth - slider.clientWidth) {
    slider.scrollTo({
      top: 0,
      left: (scrollAmount += 1000),
      behavior: "smooth"
    })
  }
})

function createProductImageElement(imageSource) {
  const div = document.createElement('div');
  div.className = 'item-wrapper';
  const img = document.createElement('img');
  img.src = imageSource;
  div.appendChild(img);
  return div;
}

function createCustomElement(element, className, innerText, sku) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', () => {
      creatCartList(sku);
    });
  }
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('div');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'titulo-item', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('h2', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('p', 'frete', `Frete grátis`));
  section.appendChild(createCustomElement('button', 'item__add', 'adicinar ao carrinho', sku));

  return section;
}

const createProductList = async (produto = 'tecnologia') => {
  const produtos = await fetchProducts(produto);

  containerProducts.innerHTML = '';
  produtos.results.forEach((item) => { 
  const sku = item.id;
  const name = item.title;
  const image = item.thumbnail;
  const { price } = item;

  containerProducts.appendChild(createProductItemElement({ sku, name, image, price }));
  });
};

lupa.addEventListener('click', () => {
  const search = document.querySelector('#productSearch').value;
  createProductList(search);
})

window.onload = () => { createProductList(); };