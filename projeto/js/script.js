import SalvaCliente from "./salvaCliente.js";

fetch('/projeto/json/clienteAPI.json')
  .then(response => response.json())
  .then(data => {
    const {save} = data
    const salvaCliente = new SalvaCliente('[data-form="cadastro-cliente"] .data-container', save, '.btn-salvar-dados-pessoais')
  })