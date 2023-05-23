export default class BuscaProduto {
  constructor(urlAPI) {
    this.inputChassi = document.querySelector('[data-form="busca-produto"] #chassi-busca')
    this.listaDados = document.querySelector('.lista-dados')
    this.listaDadosChaves = this.listaDados.querySelectorAll('.chaves')
    this.listaDadosValores = this.listaDados.querySelectorAll('.valores')
    this.btnBuscar = document.querySelector('[data-form="busca-produto"] .btn-buscar-produto')
    this.urlAPI = urlAPI

    this.init()
  }

  handleClick(event) {
    event.preventDefault()

    if (this.inputChassi.value === '') {
      alert('PREENCHA O CAMPO CHASSI!')
    } else {
      this.atualizarURLFetch()
      this.fazerFetchURL()
    }
  }

  atualizarURLFetch() {
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
      } else {
        return response.json()
      }
    })

    .then(produto => {
      this.preencherListaProduto(produto)
    })

  }

  preencherListaProduto(produto) {
    this.listaDadosChaves.forEach(spanChave => {
      const spanChaveMinusculo = spanChave.innerText.toLowerCase()
      const spanValor = spanChave.nextElementSibling

      if (spanChaveMinusculo === 'preco')
        spanValor.innerText = this.formatarPreco(produto[spanChaveMinusculo])
      else
        spanValor.innerText = produto[spanChaveMinusculo]
    })
  }

  formatarPreco(preco) {
    const precoFloat = parseFloat(preco)
    return precoFloat.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
  }

  init() {
    if (this.inputChassi && this.btnBuscar && this.urlAPI) {
      this.btnBuscar.addEventListener('click', this.handleClick.bind(this))
    } else {
      console.log('Erro ao carregar buscaProduto.js');
    }
  }

}