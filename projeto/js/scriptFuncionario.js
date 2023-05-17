import SalvaFuncionario from "./jsFuncionario/salvaFuncionario.js";
import ValidaFormulario from "./jsFuncionario/regexValidaFormularioFuncionario.js";

function fazerFetchURLs(endp, Classe) {
  fetch('/projeto/json/FuncionarioAPI.json')
    .then(response => response.json())
    .then(data => {
      const endpoint = data[endp]
      const classe = new Classe(endpoint)
    })
}

fazerFetchURLs('save', SalvaFuncionario)
const validaFormulario = new ValidaFormulario()