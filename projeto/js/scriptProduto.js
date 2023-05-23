import SalvaProduto from "./jsProduto/salvaProduto.js"
import BuscaProduto from "./jsProduto/buscaProduto.js"
import AtualizaProduto from "./jsProduto/atualizaProduto.js"
import LimpaFormulario from "./jsProduto/limpaFormulario.js"
import ValidaFormulario from "./jsProduto/regexValidaFormulario.js"

function fazerFetchURLs(endp, Classe) {
  fetch('/projeto/json/produtoAPI.json')
    .then(response => response.json())
    .then(data => {
      const endpoint = data[endp]
      const classe = new Classe(endpoint)
    })
}

const validaFormulario = new ValidaFormulario()
const limpaFormulario = new LimpaFormulario()
fazerFetchURLs('save', SalvaProduto)
fazerFetchURLs('getByChassi', BuscaProduto)
fazerFetchURLs('update', AtualizaProduto)