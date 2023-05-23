export default class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('[data-form="cadastro-produto"]')

    this.todosRegex = {
      placa: /([\w]{3})-?([\w]{4})/gi
    }

    this.init()
  }

  handleChange(event) {
    switch(event.target.name) {
      case 'placa':
        this.validarRegex(event, this.todosRegex.placa)
        break
      case 'kilometragem':
        this.formatarNumero(event)
        break
      case 'preco':
        this.formatarNumero(event)
        break
    }
  }

  validarRegex({target}, regex) {

    if (target.value === '' || target.value == undefined || target.value == null) {
      console.log('PLACA NÃO SETADA');
    
    } else {
      const valorValido = target.value.match(regex)

      if (valorValido && valorValido[0] === target.value) {
        this.alterarClasseValido(target)
        this.formatarClasseValido(target)
        this.formatarValorInput(target)
      } else {
        this.alterarClasseInvalido(target)
        this.formatarValorInvalido(target)
      }
    }
  }

  formatarNumero({target}) {
    const floatValue = parseFloat(target.value)
    let valorFormatado = 0

    if (target.name === 'preco') {
      valorFormatado = floatValue.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
      target.value = valorFormatado
    
    } else {
      valorFormatado = floatValue.toLocaleString('PT-BR')
      target.value = valorFormatado
    }
  }

  alterarClasseValido(target) {
    target.classList.remove('input-invalido')
    target.classList.add('input-valido')
  }

  formatarClasseValido(target) {
    target.previousElementSibling.classList.remove('label-invalido')
    target.previousElementSibling.classList.add('label-valido')
  }

  formatarValorInput(target) {
    target.value = target.value
      .replace(this.todosRegex.placa, '$1$2')
      .toUpperCase()
  }

  alterarClasseInvalido(target) {
    target.classList.remove('input-valido')
    target.classList.add('input-invalido')
  }

  formatarValorInvalido(target) {
    target.value = ''
    target.focus()
    target.previousElementSibling.classList.remove('label-valido')
    target.previousElementSibling.classList.add('label-invalido')
  }

  init() {
    if (this.formulario) {
      this.formulario.addEventListener('change', this.handleChange.bind(this))
    } else {
      console.log('Erro ao carregar arquivo regexValidaFormulario.js');
    }
  }
}