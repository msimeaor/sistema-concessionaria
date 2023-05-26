export default class CalculaPrecoVenda {
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