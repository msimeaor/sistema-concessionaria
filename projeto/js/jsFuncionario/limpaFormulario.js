export default class LimpaFormulario {
  constructor() {
    this.entradasFormulario = document.querySelectorAll('[data-form="cadastro-funcionario"] .data-container')
    this.codigoFormulario = document.querySelector('.id-funcionario')
    this.btnLimparFormulario = document.querySelector('.btn-limpar-dados-pessoais')

    this.init()
  }

  limparFormulario() {
    this.codigoFormulario.value = ''
    this.entradasFormulario.forEach(entrada => {
      if (entrada.name === 'uf') {
        entrada.selectedIndex = 0
      } else {
        entrada.value = ''
      }

      entrada.classList.remove('input-valido')
      entrada.previousElementSibling.classList.remove('label-valido')
    })
  }

  init() {
    if (this.entradasFormulario.length && this.codigoFormulario && this.btnLimparFormulario) {
      this.btnLimparFormulario.addEventListener('click', this.limparFormulario.bind(this))
    } else {
      console.log('Erro ao carregar arquivo limparFormulario.js');
    }
  }
}