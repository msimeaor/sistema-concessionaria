export default class CancelaPedido {
  constructor(arrayItens) {
    this.arrayItens = arrayItens
    this.btnCancelaPedido = document.querySelector('.cancela-pedido')
    this.btnCancelaProduto = document.querySelector('.cancela-produto')
    this.inputPrecoFinal = document.querySelector('#total')
    this.tbody = document.querySelector('.tabela-itens tbody')

    this.handleCancelaPedido = this.handleCancelaPedido.bind(this)
    this.handleCancelaProduto = this.handleCancelaProduto.bind(this)

    this.init()
  }

  handleCancelaPedido() {
    if (!this.arrayItens.length)
      alert('NÃO EXISTEM ITENS CADASTRADOS!')
    else {
      if (Array.isArray(this.arrayItens)) {
        this.arrayItens.splice(0, (this.arrayItens.length))
      }

      this.todosTrTbody = this.tbody.querySelectorAll('tr')
      this.removeTodosRegistrosTabela()
      this.calcularPrecoFinal()
    }
  }

  handleCancelaProduto() {
    if (!this.arrayItens.length)
      alert('NÃO EXISTEM ITENS CADASTRADOS!')
    else {
      const ultimaPosArray = this.arrayItens.length - 1
      this.arrayItens.splice(ultimaPosArray, 1)
      
      this.ultimoTrTbody = this.tbody.lastChild
      this.removerUltimoRegistroTabela()
      this.calcularPrecoFinal()
    }
  }

  calcularPrecoFinal() {
    let precoFinal = 0

    if (Array.isArray(this.arrayItens)) {
      this.arrayItens.forEach(item => {
        precoFinal += item['subtotal']
      })

      this.inputPrecoFinal.value = this.formatarPrecoFinal(precoFinal)
    }
  }

  formatarPrecoFinal(precoFinal) {
    return precoFinal.toLocaleString('PT-BR', {style: 'currency', currency: 'BRL'})
  }

  removeTodosRegistrosTabela() {
    this.todosTrTbody.forEach(tr => {
      this.tbody.removeChild(tr)
    })

    this.todosTrTbody = []
  }

  removerUltimoRegistroTabela() {
    this.tbody.removeChild(this.ultimoTrTbody)
    this.ultimoTrTbody = null
  }

  adcEventos() {
    this.btnCancelaPedido.addEventListener('click', this.handleCancelaPedido)
    this.btnCancelaProduto.addEventListener('click', this.handleCancelaProduto)
  }

  removerEventos() {
    this.btnCancelaPedido.removeEventListener('click', this.handleCancelaPedido)
    this.btnCancelaProduto.removeEventListener('click', this.handleCancelaProduto)
  }

  init() {
    this.adcEventos()
  }

}