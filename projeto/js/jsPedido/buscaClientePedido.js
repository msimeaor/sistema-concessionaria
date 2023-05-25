export default class BuscaClientePedido {
  constructor(urlAPI) {
    this.urlAPI = urlAPI
    this.btnBuscaCliente = document.querySelector('.busca-cliente')
    this.inputCpf = document.querySelector('#cpf')
    this.inputCodigoCliente = document.querySelector('#id')
    this.regexCpf = /(\d{3})[\s-.]?(\d{3})[\s-.]?(\d{3})[\s-.]?(\d{2})/g

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.init()
  }

  handleChange({target}) {
    const matchCpf = this.validarCpf(target)
    
    if (matchCpf && matchCpf[0] === target.value) {
      this.alterarClasseValido(target)
      this.formatarClasseValido(target)
      this.formatarValorInput(target)
      this.cpfValido = true
    } else {
      this.alterarClasseInvalido(target)
      this.formatarInputInvalido(target)
      this.cpfValido = false
    }
  
  }

  validarCpf(target) {
    return target.value.match(this.regexCpf)
  }

  alterarClasseValido(target) {
    target.classList.remove('input-invalido')
    target.classList.add('input-valido')
  }

  formatarClasseValido(target) {
    target.nextElementSibling.classList.remove('label-invalido')
    target.nextElementSibling.classList.add('label-valido')
  }

  formatarValorInput(target) {
    target.value = target.value.replace(
      this.regexCpf, '$1.$2.$3-$4'
    )
  }

  alterarClasseInvalido(target) {
    target.classList.remove('input-valido')
    target.classList.add('input-invalido')
  }

  formatarInputInvalido(target) {
    target.value = ''
    target.focus()
  }

  handleClick() {
    if (this.cpfValido == true) {
      this.atualizarURLAPI()
      this.fazerFetchAPI()
    } else
      alert('O NUMERO DE CPF NÃO É VALIDO!')
  }

  atualizarURLAPI() {
    this.urlAPI = this.urlAPI.replace(/\/[^/]+$/g, '/' + this.inputCpf.value)
  }

  fazerFetchAPI() {
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
        } else
          return response.json()
      })
      .then(cliente => {
        this.preencherCodigoCliente(cliente)
      })
  }

  preencherCodigoCliente(cliente) {
    this.inputCodigoCliente.value = cliente['id']
  }

  adcEventos() {
    this.inputCpf.addEventListener('change', this.handleChange)
    this.btnBuscaCliente.addEventListener('click', this.handleClick)
  }
  
  init() {
    if (this.urlAPI && this.inputCpf && this.inputCodigoCliente) {
      this.adcEventos()
    } else
      console.log('Erro ao carregar buscaClientePedido.js');
  }
}