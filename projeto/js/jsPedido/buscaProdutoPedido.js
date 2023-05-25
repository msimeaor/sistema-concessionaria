export default class BuscaProdutoPedido {
  constructor(urlAPI) {
    this.urlAPI = urlAPI
    this.inputChassi = document.querySelector('#chassi')
    this.btnBuscarChassi = document.querySelector('.busca-chassi')
    this.inputCodigoProduto = document.querySelector('#produto')
    this.inputPrecoProduto = document.querySelector('#preco')
    this.inputQtd = document.querySelector('#qtd')

    this.handleClick = this.handleClick.bind(this)
    this.init()
  }

  handleClick() {
    if (this.inputChassi.value != '') {
      this.atualizarURLAPI()
      this.fazerFetchURL()
    } else
        alert('PREENCHA O CHASSI DO CARRO!')
  }

  atualizarURLAPI() {
    this.urlAPI = this.urlAPI.replace(/\/[^/]+$/g, '/' + this.inputChassi.value)
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
          alert('CHASSI NÃO ENCONTRADO!')
          return response.json()
        } else
            return response.json()
      })
      .then(produto => {
        this.preencherDadosProduto(produto)
      })
  }

  adcEventos() {
    this.btnBuscarChassi.addEventListener('click', this.handleClick)
  }

  preencherDadosProduto(produto) {
    this.inputCodigoProduto.value = produto['id']
    this.formatarPreco(produto)
  }

  formatarPreco({preco}) {
    const precoFloat = parseFloat(preco)
    const precoFormatado = precoFloat.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
    this.inputPrecoProduto.value = precoFormatado
  }

  init() {
    if (this.urlAPI &&
        this.btnBuscarChassi &&
        this.inputChassi &&
        this.inputCodigoProduto &&
        this.inputPrecoProduto &&
        this.inputQtd) {

          this.adcEventos()

    } else
        console.log('Erro ao carregar buscaProdutoPedido.js');
  }

}