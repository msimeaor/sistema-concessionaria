export default class AdidionaItem {
  constructor() {
    this.inputChassi = document.querySelector('#chassi')
    this.inputProduto = document.querySelector('#produto')
    this.inputPreco = document.querySelector('#preco')
    this.inputQuantidade = document.querySelector('#qtd')
    this.btnAdicionaItem = document.querySelector('.adiciona-item')
    this.tabelaItens = document.querySelector('.tabela-itens')
    this.tbodyTabelaItens = this.tabelaItens.querySelector('tbody')
    this.arrayItens = []

    this.handleClick = this.handleClick.bind(this)
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
    const propriedades = ['produto', 'quantidade', 'preco', 'subtotal']
    const ultimaPosArrayItens = this.arrayItens.length - 1

    for(let i=0; i<4; i++) {
      const td = document.createElement('td')
      const propriedade = propriedades[i]

      if (propriedade === 'subtotal') {
        const subtotal = this.formatarSubtotal(this.arrayItens[ultimaPosArrayItens][propriedade])
        td.innerText = subtotal
      } else {
        td.innerText = this.arrayItens[ultimaPosArrayItens][propriedade]
      } 
      
      tr.appendChild(td)
    }

    this.tbodyTabelaItens.appendChild(tr)
    const calcularPrecoVenda = new CalculaPrecoVenda(this.arrayItens)
    this.limparDadosProduto()
  }

  formatarSubtotal(subtotalFloat) {
    return subtotalFloat
      .toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
  }

  limparDadosProduto() {
    this.inputChassi.value = ''
    this.inputChassi.focus()
    this.inputPreco.value = ''
    this.inputProduto.value = ''
    this.inputQuantidade.value = ''
  }

  adcEventos() {
    this.btnAdicionaItem.addEventListener('click', this.handleClick)
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

class CalculaPrecoVenda {
  constructor(arrayItens) {
    this.arrayItens = arrayItens
    this.total = document.querySelector('#total')

    this.init()
  }

  calcularPreco() {
    let valorTotal = 0

    if (Array.isArray(this.arrayItens)) {
      this.arrayItens.forEach(obj => {
        const precoFloat = this.formatarPreco(obj)
        valorTotal += precoFloat
        this.total.value = this.formatarEPreencherTotal(valorTotal)
      })
    }
  }

  formatarPreco(obj) {
    return ((+obj['preco']
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.')) * obj['quantidade']) 
  }

  formatarEPreencherTotal(valorTotal) {
    const totalFloat = parseFloat(valorTotal)
    return totalFloat.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
  }

  init() {
    this.calcularPreco()
  }
}