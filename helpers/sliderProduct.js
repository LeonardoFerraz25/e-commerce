const fetchProductscroll = async (produto) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  const itens = await fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(erro => erro);

  return itens;
}

function creatImgScrollCard(imageSource) {
  const div = document.createElement('div');
  div.className = 'cards-scroll-wrapper';
  const img = document.createElement('img');
  img.src = imageSource;
  div.appendChild(img);
  return div;
}

function createCustomElementScrollCard(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductScrollElement({name, image, price }) {
  const section = document.createElement('div');
  section.className = 'cards-scroll';

  section.appendChild(createCustomElementScrollCard('span', 'card-srcoll-titulo', name));
  section.appendChild(creatImgScrollCard(image));
  section.appendChild(createCustomElementScrollCard('span', 'scroll-price', `R$ ${price}`));
  

  return section;
}

const createProductListScroll = async () => {
  const produtosItem = await fetchProductscroll('gamer');
  const scroll = document.querySelector('.scroll');
  scroll.innerHTML = '';
  produtosItem.results.forEach((item) => { 
  const name = item.title;
  const image = item.thumbnail;
  const { price } = item;

  scroll.appendChild(createProductScrollElement({ name, image, price }));
  });
};
