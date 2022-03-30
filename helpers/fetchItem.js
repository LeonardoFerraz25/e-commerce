const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  const item = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);

  return item;
};
