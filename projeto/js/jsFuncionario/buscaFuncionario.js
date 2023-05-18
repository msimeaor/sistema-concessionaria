export default class BuscaFuncionario {
  constructor(urlAPI) {
    this.inputCPF = document.querySelector('[data-form="busca-funcionario"] #cpf-busca')
    this.listaDados = document.querySelector('.lista-dados')
    this.listaDadosChaves = this.listaDados.querySelectorAll('.chaves')
    this.listaDadosValores = this.listaDados.querySelectorAll('.valores')
    this.btnBuscar = document.querySelector('[data-form="busca-funcionario"] .btn-buscar-funcionario')
    this.urlAPI = urlAPI

    this.init()
  }

  handleChange(event) {
    this.validarCPFComRegex(event)
  }

  validarCPFComRegex({target}) {
    const regex = /(\d{3})[\s-.]?(\d{3})[\s-.]?(\d{3})[\s-.]?(\d{2})/g
    const cpfValido = target.value.match(regex)

    if (cpfValido && cpfValido[0] === target.value) {
      this.alterarClasseValido()
      this.formatarValorInput(regex)
    } else {
      this.alterarClasseInvalido()
      this.formatarInputInvalido()
    }

  }

  alterarClasseValido() {
    this.inputCPF.classList.remove('input-invalido')
    this.inputCPF.classList.add('input-valido')
  }

  formatarValorInput(regex) {
    this.inputCPF.value = this.inputCPF.value.replace(regex, '$1.$2.$3-$4')
  }

  alterarClasseInvalido() {
    this.inputCPF.classList.remove('input-valido')
    this.inputCPF.classList.add('input-invalido')
  }

  formatarInputInvalido() {
    this.inputCPF.value = ''
    this.inputCPF.focus()
  }

  handleClick(event) {
    event.preventDefault()

    if (this.inputCPF.value === '') {
      alert('PREENCHA O CAMPO CPF!')
    } else {
      this.atualizarURLFetch()
      this.fazerFetchURL()
    }
  }

  atualizarURLFetch() {
    this.urlAPI = this.urlAPI.replace(/\/[^/]+$/g, '/' + this.inputCPF.value)
  }

  fazerFetchURL() {
    fetch(this.urlAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then(response => {
      if (response.status === 404) {
        alert('CPF NÃO ENCONTRADO!')
        return response.json()
      } else {
        return response.json()
      }
    })

    .then(funcionario => {
      this.preencherListaFuncionario(funcionario)
    })

  }

  preencherListaFuncionario(funcionario) {
    this.listaDadosChaves.forEach(spanChave => {
      const spanChaveMinusculo = spanChave.innerText.toLowerCase()
      const spanValor = spanChave.nextElementSibling
      spanValor.innerText = funcionario[spanChaveMinusculo]
    })
  }

  init() {
    if (this.inputCPF && this.btnBuscar && this.urlAPI) {
      this.inputCPF.addEventListener('change', this.handleChange.bind(this))
      this.btnBuscar.addEventListener('click', this.handleClick.bind(this))
    } else {
      console.log('Erro ao carregar buscaCliente.js');
    }
  }

}