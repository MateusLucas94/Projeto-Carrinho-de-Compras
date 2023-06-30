const pegarElementoCarrinho = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function cartItemClickListener(event) {
   event.currentTarget.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function salvarItensCarrinho(textoDoElemento) {
  let pegarItensJaSalvos = JSON.parse(getSavedCartItems());
  console.log(typeof textoDoElemento);
    if (pegarItensJaSalvos === null) {
      pegarItensJaSalvos = [];
    }
    pegarItensJaSalvos.push(textoDoElemento);
    saveCartItems(JSON.stringify(pegarItensJaSalvos));
}

async function addNoCarrinho(event) {
  const buscarSection = event.currentTarget.parentElement.querySelector('.item__sku');
  const id = buscarSection.innerText;
  const obterDadosDoProduto = await fetchItem(id);
  const sku = obterDadosDoProduto.id;
  const name = obterDadosDoProduto.title;
  const salePrice = obterDadosDoProduto.price;
  const obterValorRetornado = createCartItemElement({ sku, name, salePrice });
  console.log(obterValorRetornado.innerText);
  salvarItensCarrinho(obterValorRetornado.innerText);
  const pegarElementoLi = document.querySelector('.cart__items');
  pegarElementoLi.appendChild(obterValorRetornado);
}

async function pegarElementosDaFuncao() {
  const pegarResultadosApi = await fetchProducts('computador');
  const capturarOElemento = document.querySelector('.items');
  document.querySelector('.loading').remove();
  pegarResultadosApi.results.forEach((element) => {
  const sku = element.id;
  const name = element.title;
  const image = element.thumbnail;
  const capturarOValor = createProductItemElement({ sku, name, image });
  capturarOValor.querySelector('.item__add').addEventListener('click', addNoCarrinho);
  capturarOElemento.appendChild(capturarOValor);
});
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function salvarPagina() {
  const pegarElementosStorage = JSON.parse(localStorage.getItem('cartItems'));
  pegarElementosStorage.forEach((element) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = element;
  li.addEventListener('click', cartItemClickListener);
    pegarElementoCarrinho.appendChild(li);
  });
}

function EsvaziarCarrinho() {
  pegarElementoCarrinho.innerHTML = '';
}

const capturarBotao = document.querySelector('.empty-cart');
capturarBotao.addEventListener('click', EsvaziarCarrinho);

window.onload = async () => {
 console.log(await fetchProducts('computador'));

  await pegarElementosDaFuncao();
  salvarPagina();
};
