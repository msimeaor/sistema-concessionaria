import SalvaCliente from "./salvaCliente.js";
import ValidaFormulario from "./regexValidaFormulario.js";

// INSTANCIA DAS CLASSES
const validaFormulario = new ValidaFormulario('[data-form="cadastro-cliente"]')

fetch('/projeto/json/clienteAPI.json')
  .then(response => response.json())
  .then(data => {
    const {save} = data
    const salvaCliente = new SalvaCliente('[data-form="cadastro-cliente"] .data-container', save, '.btn-salvar-dados-pessoais')
  })