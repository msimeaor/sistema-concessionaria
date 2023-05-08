export default class ValidaFormulario {
  constructor(formulario) {
    this.formulario = document.querySelector(formulario)

    this.todosRegex = {
      email: /([\w-.]+)@([\w-.]+)/gi,
      celular: /([+]?55[\s]?)([(]?61[)]?)[\s]?(\d{5}[-]?\d{4})/g,
      telefone: /([+]?55[\s]?)([(]?61[)]?)[\s]?(\d{4}[-]?\d{4})/g,
      cep: /(\d{5})[-.\s]?(\d{3})/g,
      rg: /(\d)[\s.-]?(\d{3})[\s.-]?(\d{3})/g,
      cpf: /(\d{3})[\s-.]?(\d{3})[\s-.]?(\d{3})[\s-.]?(\d{2})/g
    }

    this.init()
  }

  handleChange(event) {
    switch(event.target.name) {
      case 'email':
        this.validarRegex(event, 'email', this.todosRegex.email)
        break
      case 'celular':
        this.validarRegex(event, 'numero', this.todosRegex.celular)
        break
      case 'telefone':
        this.validarRegex(event, 'numero', this.todosRegex.telefone)
        break
      case 'cep':
        this.validarRegex(event, 'cep', this.todosRegex.cep)
        break
      case 'rg':
        this.validarRegex(event, 'rg', this.todosRegex.rg)
        break
      case 'cpf':
        this.validarRegex(event, 'cpf', this.todosRegex.cpf)
    }
  }

  validarRegex({target}, tipoDado, regex) {
    const valorValido = target.value.match(regex)

    if (valorValido && valorValido[0] === target.value) {
      this.alterarClasseValido(target)
      this.formatarClasseValido(target)

      if (tipoDado === 'numero') {
        this.limparValorInput(target)
      } else if (tipoDado != 'email') {
        this.formatarValorInput(target, tipoDado)
      }

    } else {
      this.alterarClasseInvalido(target)
      this.formatarValorInvalido(target)
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

  limparValorInput(target) {
    target.value = target.value
      .replace(/\D/g, '')
  }

  formatarValorInput(target, tipoDado) {
    if (tipoDado === 'cep') {
      target.value = target.value
        .replace(this.todosRegex.cep, '$1-$2')
    
    } else if (tipoDado === 'rg') {
      target.value = target.value
        .replace(this.todosRegex.rg, '$1.$2.$3')
    
    } else {
      target.value = target.value
        .replace(this.todosRegex.cpf, '$1.$2.$3-$4')
    }
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