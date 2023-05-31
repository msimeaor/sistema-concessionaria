export default class SalvaPedido {
  constructor(urlAPI) {
    this.urlAPI = urlAPI
    this.btnSalvar = document.querySelector('.salva-pedido')
    this.itensPedidos = [] // LISTA DE ITENS. VAI DENTRO DO OBJETO PEDIDO
    this.objPedido = {} // OBJETO QUE VAI SER MANDADO PRA API
    this.inputCodigoCliente = document.querySelector('#id')
    this.inputTotal = document.querySelector('#total')
    this.bodyTabelaItens = document.querySelector('.tabela-itens tbody')
    this.trTabelaItens = []

    this.handleClick = this.handleClick.bind(this)
    this.init()
  }

  handleClick(event) {
    if (this.formulariosValidos()) {
      
      this.preencherListaItensPedidos()
      this.preencherObjPedido()
      this.fazerFetchAPI()

    } else
        alert('INFORMAÇÕES INVÁLIDAS! REVISE O FORMULARIO')
  }

  formulariosValidos() {
    this.trTabelaItens = this.bodyTabelaItens.querySelectorAll('tr')
    const trIsNotEmpty = this.trTabelaItens.length
    return this.trTabelaItens.length && this.inputCodigoCliente.value
  }

  preencherListaItensPedidos() {
    this.trTabelaItens.forEach(tr => {
      const tdTabelaItens = tr.querySelectorAll('td')
      this.itensPedidos.push({produto: tdTabelaItens[0].innerText, quantidade: +tdTabelaItens[1].innerText})
    })
  }

  preencherObjPedido() {
    this.objPedido['cliente'] = this.inputCodigoCliente.value
    this.objPedido['itensPedidos'] = this.itensPedidos
  }

  fazerFetchAPI() {
    fetch(this.urlAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.objPedido)
    })
    .then(response => {
      if (response.status === 409) {
        alert('ESTE PEDIDO JÁ ESTÁ REGISTRADO!')
        return response.json()
      } else {
        alert('PEDIDO CADASTRADO COM SUCESSO')
        return response.json()
      }
    })
    .then(pedido => {
      console.log(pedido['pedido']);
    })
    .finally(this.limparDadosTela())
  }

  limparDadosTela() {
    this.itensPedidos = []
    this.objPedido = {}
    this.inputCodigoCliente.value = ''
    this.inputTotal.value = ''
    this.trTabelaItens.forEach(tr => {
      this.bodyTabelaItens.removeChild(tr)
    })
  }

  adcEventos() {
    this.btnSalvar.addEventListener('click', this.handleClick)
  }

  init() {
    if (this.btnSalvar) {
      this.adcEventos()
    } else
        console.log('Erro ao carregar salvaPedido.js');
  }

}