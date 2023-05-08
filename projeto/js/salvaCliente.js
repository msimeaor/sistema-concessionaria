export default class SalvaCliente {
  constructor(entradasFormulario, urlAPI, botaoAction) {
    this.urlAPI = urlAPI
    this.entradasFormulario = document.querySelectorAll(entradasFormulario)
    this.botaoAction = document.querySelector(botaoAction)
    this.dadosCliente = {}

    this.init()
  }

  handleBotaoAction(event) {
    event.preventDefault()
    this.preencherObjetoDadosCliente()

    if (this.verificarInputsNulos()) {
      alert('Com excessão de "complemento", todos os campos devem ser preenchidos')
    } else {
      this.fazerFetchAPI()
    }
    
  }

  preencherObjetoDadosCliente() {
    this.entradasFormulario.forEach(entrada => {
      const nome = entrada.name
      const valor = entrada.value
      this.dadosCliente[`${nome}`] = valor
    })
  }

  verificarInputsNulos() {
    let arrayDadosCliente = []

    for(let atr in this.dadosCliente) {
      if (this.dadosCliente.hasOwnProperty(atr)) {
        if (atr != 'complemento') {
          const valor = this.dadosCliente[atr]
          arrayDadosCliente.push(valor)
        }
      }
    }

    return arrayDadosCliente.some(valor => valor == false)
  }

  fazerFetchAPI() {
    fetch(this.urlAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.dadosCliente)
    })

    .then(response => {
      if (response.status === 201) {
        return response.json()
      } else {
        alert('Erro ao cadastrar o cliente')
        return response.json()
      }
    })

    .then(cliente => {
      alert(`Cliente cadastrado com sucesso!`)
    })
    
    .catch(error => {
      console.log(error);
    })
  }

  init() {
    if (this.entradasFormulario.length && this.urlAPI && this.botaoAction) {
      this.botaoAction.addEventListener('click', this.handleBotaoAction.bind(this))
    } else {
      console.log('Erro ao carregar o arquivo salvaCliente.js');
    }
  }
}