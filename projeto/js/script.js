import SalvaCliente from "./jsCliente/salvaCliente.js";
import ValidaFormulario from "./jsCliente/regexValidaFormulario.js";
import BuscaCliente from "./jsCliente/buscaCliente.js";
import AtualizaCliente from "./jsCliente/atualizaCliente.js";
import LimpaFormulario from "./jsCliente/limpaFormulario.js";
import DeletaCliente from "./jsCliente/deletaCliente.js";

function fazerFetchURLs(endp, Classe) {
  fetch('/projeto/json/clienteAPI.json')
    .then(response => response.json())
    .then(data => {
      const endpoint = data[endp]
      const classe = new Classe(endpoint)
    })
}

// INSTANCIA DAS CLASSES
const limparFormulario = new LimpaFormulario() 
const validaFormulario = new ValidaFormulario()
fazerFetchURLs('save', SalvaCliente)
fazerFetchURLs('getByCpf', BuscaCliente)
fazerFetchURLs('update', AtualizaCliente)
fazerFetchURLs('delete', DeletaCliente)
