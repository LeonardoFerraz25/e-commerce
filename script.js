const openCart = document.querySelector('#openCart');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const slider = document.querySelector('.scroll');
const cart = document.querySelector('.carrinho');
const containerProducts = document.querySelector('.items');
const lupa = document.querySelector('#searchItem');
const counter = document.querySelector('.item-counter')
const cartlist = document.querySelector('.cart__items');
const subtotal = document.querySelector('.total-price');
const clearButton = document.querySelector('.empty-cart');
let scrollAmount = 0;

clearButton.addEventListener('click', () => {
  subtotal.innerHTML = 0;
  counter.innerHTML = 0;
  cartlist.innerHTML = '';
});

openCart.addEventListener('click', () => {
  document.querySelector('.container-cartTitle').classList.toggle('show-title');
  openCart.classList.toggle('visible');
  cart.classList.toggle('show-cart');
});

const counterItens = () => {
  const itens = document.querySelectorAll('.cart__item').length;
  counter.innerHTML = itens;
};

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

function cartItemClickListener(event) {
  event.target.remove();
  counterItens();
  saveCartItems(cartlist.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    event.target.remove();
    counterItens();
    
    const total = Number(subtotal.innerHTML);
    const valor = Number(salePrice);
    const preço = total - valor;
    subtotal.innerHTML = parseFloat(preço);
  });
  return li;
}

const totalprice = async (id) => {
  const produto = await fetchItem(id);
  const salePrice = produto.price;
  const total = Number(subtotal.innerHTML);
  const valor = Number(salePrice);
  const preço = total + valor;
  subtotal.innerHTML = parseFloat(preço);
};

const creatCartList = async (id) => {
  const produto = await fetchItem(id);

  const sku = produto.id;
  const name = produto.title;
  const salePrice = produto.price;

  cartlist.appendChild(createCartItemElement({ sku, name, salePrice }));
  totalprice(id);
  counterItens();
};

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