import SalvaCliente from "./salvaCliente.js";
import ValidaFormulario from "./regexValidaFormulario.js";
import BuscaCliente from "./buscaCliente.js";
import AtualizaCliente from "./atualizaCliente.js";
import LimparFormulario from "./limparFormulario.js";

function fazerFetchURLs(endp, Classe) {
  fetch('/projeto/json/clienteAPI.json')
    .then(response => response.json())
    .then(data => {
      const endpoint = data[endp]
      const classe = new Classe(endpoint)
    })
}

// INSTANCIA DAS CLASSES
const limparFormulario = new LimparFormulario() 
const validaFormulario = new ValidaFormulario()
fazerFetchURLs('save', SalvaCliente)
fazerFetchURLs('getByCpf', BuscaCliente)
fazerFetchURLs('update', AtualizaCliente)
