const modeloCarro = document.getElementsByName("carro");
const imgCarro = document.getElementById("imgCarro");
const pintura = document.getElementById("ckPintura");
const alarme = document.getElementById("ckAlarme");
const valor = document.getElementById("outPreco");

const OpcionaisCheckbox = [pintura, alarme];
let carroSelecionado = { modelo: "ka", preco: 45900.0, opcionais: [] };
const moedaConfig = { style: "currency", currency: "BRL" };

const carros = [
  { modelo: "ka", preco: 45900.0, opcionais: [] },
  { modelo: "fiesta", preco: 54500.0, opcionais: [] },
  { modelo: "focus", preco: 78100.0, opcionais: [] },
];

const opcionais = [
  { item: "ckPintura", preco: 1500 },
  { item: "ckAlarme", preco: 500 },
];

window.addEventListener("load", () => {
  modeloCarro[0].checked = true;
  imgCarro.src = `img/${carroSelecionado.modelo}.png`;
  carroSelecionado.opcionais = [];
  OpcionaisCheckbox.forEach((item) => {
    item.checked = false;
  });
  carregarPrecoTotal(carroSelecionado);
});

modeloCarro.forEach((item) => {
  item.addEventListener("change", () => {
    pintura.checked = false;
    alarme.checked = false;
    carroSelecionado.opcionais = [];
    carroSelecionado = carros.find((carro) => carro.modelo === item.id);
    carregarPrecoTotal(carroSelecionado);
    imgCarro.src = `img/${item.id}.png`;
  });
});

OpcionaisCheckbox.forEach((item) => {
  item.addEventListener("change", async () => {
    const opcional = opcionais.find((op) => {
      return op.item === item.id;
    });
    if (item.checked) {
      carroSelecionado.opcionais.push(opcional);
    } else {
      carroSelecionado.opcionais.splice(
        carroSelecionado.opcionais.indexOf(opcional),
        1
      );
    }
    carregarPrecoTotal(carroSelecionado);
  });
});

function carregarPrecoTotal(carroSelecionado) {
  const valorDoCarro = carroSelecionado.preco;
  const valorDosOpcionais = carroSelecionado.opcionais.reduce(
    (ac, op) => (ac += op.preco),
    0
  );
  const valorTotal = valorDoCarro + valorDosOpcionais;
  valor.textContent = valorTotal.toLocaleString("pt-br", moedaConfig);
}
