const fetchProducts = async (produto) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  const itens = await fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(erro => erro);

  return itens;
}
