import CalculaPrecoVenda from './calculaPrecoVenda.js'
import CancelaPedido from './cancelaPedido.js'

export default class FechamentoPedido {
  constructor() {
    this.inputChassi = document.querySelector('#chassi')
    this.inputProduto = document.querySelector('#produto')
    this.inputPreco = document.querySelector('#preco')
    this.inputQuantidade = document.querySelector('#qtd')
    this.btnAdicionaItem = document.querySelector('.adiciona-item')
    this.btnSalvaPedido = document.querySelector('.salva-pedido')
    this.tabelaItens = document.querySelector('.tabela-itens')
    this.tbodyTabelaItens = this.tabelaItens.querySelector('tbody')
    this.arrayItens = []

    this.cancelaPedido = new CancelaPedido(this.arrayItens)

    this.handleClick = this.handleClick.bind(this)
    this.handleSalvaPedido = this.handleSalvaPedido.bind(this)
    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    if (this.existemInputsNulos())
      alert('EXISTEM CAMPOS INVALIDOS!')
    else {
      this.criarObjetoComOsValores()
      this.preencherTabela()
    }
  }

  existemInputsNulos() {
    if (this.inputChassi.value &&
        this.inputProduto.value &&
        this.inputPreco.value &&
        (this.inputQuantidade.value > 0)) {
          
        return false
    } else
        return true
  }

  criarObjetoComOsValores() {
    const precoFloat = this.formatarPreco(this.inputPreco.value)
    const subtotal = precoFloat * this.inputQuantidade.value

    this.arrayItens.push({
      produto: this.inputProduto.value,
      preco: this.inputPreco.value,
      quantidade: this.inputQuantidade.value,
      subtotal: subtotal
    })
  }

  formatarPreco(stringPreco) {
    return +stringPreco
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.')
  }

  preencherTabela() {
    const tr = document.createElement('tr')
    tr.classList.add('tr')
    const propriedades = ['produto', 'quantidade', 'preco', 'subtotal']
    const ultimaPosArrayItens = this.arrayItens.length - 1

    for(let i=0; i<4; i++) {
      const td = document.createElement('td')
      const propriedade = propriedades[i]

      if (propriedade === 'subtotal') {

        const calcularSubTotal = (subtotalNumero) => {
          return subtotalNumero
            .toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
        }
        td.innerText = calcularSubTotal(this.arrayItens[ultimaPosArrayItens][propriedade])
      
      } else {
        td.innerText = this.arrayItens[ultimaPosArrayItens][propriedade]
      } 
      
      tr.appendChild(td)
    }
    
    this.tbodyTabelaItens.appendChild(tr)
    
    const calculaPrecoVenda = new CalculaPrecoVenda(this.arrayItens)
    this.limparDadosProduto()
  }

  limparDadosProduto() {
    this.inputChassi.value = ''
    this.inputChassi.focus()
    this.inputPreco.value = ''
    this.inputProduto.value = ''
    this.inputQuantidade.value = ''
  }

  handleSalvaPedido() {
    this.arrayItens = []
    this.cancelaPedido.removerEventos()
    this.cancelaPedido = new CancelaPedido(this.arrayItens)
  }

  adcEventos() {
    this.btnAdicionaItem.addEventListener('click', this.handleClick)
    this.btnSalvaPedido.addEventListener('click', this.handleSalvaPedido)
  }

  init() {
    if (this.inputProduto &&
        this.inputPreco &&
        this.inputQuantidade &&
        this.btnAdicionaItem) {

          this.adcEventos()

    } else
        console.log('Erro ao carregar adicionaItem.js');
  }
}