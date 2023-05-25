import BuscaClientePedido from "./jsPedido/buscaClientePedido.js";
import BuscaProdutoPedido from "./jsPedido/buscaProdutoPedido.js";

function fazerFetchURL(dir, metodoEndpoint, Classe) {
  fetch(dir)
    .then(response => response.json())
    .then(data =>{
      const endpoint = data[metodoEndpoint]
      const classe = new Classe(endpoint)
    })
}

fazerFetchURL('/projeto/json/clienteAPI.json', 'getByCpf', BuscaClientePedido)
fazerFetchURL('/projeto/json/produtoAPI.json', 'getByChassi', BuscaProdutoPedido)