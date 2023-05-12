import SalvaCliente from "./salvaCliente.js";
import ValidaFormulario from "./regexValidaFormulario.js";
import BuscaCliente from "./buscaCliente.js";
import AtualizaCliente from "./atualizaCliente.js";

// INSTANCIA DAS CLASSES
const validaFormulario = new ValidaFormulario('[data-form="cadastro-cliente"]')

fetch('/projeto/json/clienteAPI.json')
  .then(response => response.json())
  .then(data => {
    const { save } = data
    const salvaCliente = new SalvaCliente('[data-form="cadastro-cliente"] .data-container', '[data-form="cadastro-cliente"] .id-cliente', '.btn-salvar-dados-pessoais', save)
  })

fetch('/projeto/json/clienteAPI.json')
  .then(response => response.json())
  .then(data => {
    const { getByCpf } = data
    const buscaCliente = new BuscaCliente('[data-form="busca-cliente"] #cpf-busca', '.lista-dados-cliente', '[data-form="busca-cliente"] .btn-buscar-cliente', getByCpf)
  })

fetch('/projeto/json/clienteAPI.json')
  .then(response => response.json())
  .then(data => {
    const { update } = data
    const atualizaCliente = new AtualizaCliente(update)
  })