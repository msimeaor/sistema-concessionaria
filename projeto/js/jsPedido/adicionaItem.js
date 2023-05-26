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
      alert('PREENCHA TODOS OS CAMPOS!')
    else {
      this.criarObjetoComOsValores()
      this.criarObjTabelaEPreencherTabela()
    }
  }

  existemInputsNulos() {
    if (this.inputChassi.value &&
        this.inputProduto.value &&
        this.inputPreco.value &&
        this.inputQuantidade.value) {
          
        return false
    } else
        return true
  }

  criarObjetoComOsValores() {
    // LISTA DE OBJETOS QUE SERÁ PASSADA NO FETCH. ELE REPRESENTA LISTA DE ITENS PEDIDOS
    this.arrayItens.push({
      produto: this.inputProduto.value,
      preco: this.inputPreco.value,
      quantidade: this.inputQuantidade.value
    })
  }

  criarObjTabelaEPreencherTabela() {
    const ultimaPosArray = this.arrayItens.length - 1
    const subtotal = this.calcularSubtotal(ultimaPosArray)
    
    // OBJ QUE REPRESENTA OS CAMPOS DA TABELA.
    const objTabela = {
      produto: this.arrayItens[ultimaPosArray].produto,
      quantidade: this.arrayItens[ultimaPosArray].quantidade,
      preco: this.arrayItens[ultimaPosArray].preco,
      subtotal: subtotal
    }

    this.preencherTabela(objTabela)
  }

  calcularSubtotal(ultimaPosArray) {
    const precoLimpo = (this.arrayItens[ultimaPosArray].preco)
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.')

    const precoFloat = parseFloat(precoLimpo)
    const subtotal = precoFloat * this.arrayItens[ultimaPosArray].quantidade
    return subtotal.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
  }

  preencherTabela(objTabela) {
    const tr = document.createElement('tr')
    const propriedades = ['produto', 'quantidade', 'preco', 'subtotal']

    for(let i=0 ; i<4 ; i++) {
      const td = document.createElement('td')
      const propriedade = propriedades[i]
      td.innerText = objTabela[propriedade]

      tr.appendChild(td)
    }

    this.tbodyTabelaItens.appendChild(tr)
    this.limparDadosProduto()
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