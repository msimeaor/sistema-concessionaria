export default class LimpaFormulario {
  constructor() {
    this.entradasFormulario = document.querySelectorAll('[data-form="cadastro-produto"] .data-container')
    this.codigoFormulario = document.querySelector('.id-produto')
    this.btnLimparFormulario = document.querySelector('.btn-limpar-dados-produto')

    this.init()
  }

  limparFormulario() {
    this.codigoFormulario.value = ''
    this.entradasFormulario.forEach(entrada => {

      entrada.value = ''
      entrada.classList.remove('input-valido')
      entrada.previousElementSibling.classList.remove('label-valido')
    
    })
  }

  init() {
    if (this.entradasFormulario.length && this.codigoFormulario && this.btnLimparFormulario) {
      this.btnLimparFormulario.addEventListener('click', this.limparFormulario.bind(this))
    } else {
      console.log('Erro ao carregar arquivo limpaFormulario.js');
    }
  }
}