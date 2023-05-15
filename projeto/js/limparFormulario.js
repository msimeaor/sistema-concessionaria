export default class LimparFormulario {
  constructor() {
    this.entradasFormulario = document.querySelectorAll('[data-form="cadastro-cliente"] .data-container')
    this.codigoFormulario = document.querySelector('.id-cliente')
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