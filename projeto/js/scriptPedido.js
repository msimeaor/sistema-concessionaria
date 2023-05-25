import BuscaClientePedido from "./jsPedido/buscaClientePedido.js";

fetch('/projeto/json/clienteAPI.json')
  .then(response => response.json())
  .then(data => {
    const {getByCpf} = data
    const buscaClientePedido = new BuscaClientePedido(getByCpf)
  })