export default class SalvaCliente {
  constructor(entradasFormulario, urlAPI, botaoAction) {
    this.urlAPI = urlAPI
    this.entradasFormulario = document.querySelectorAll(entradasFormulario)
    this.botaoAction = document.querySelector(botaoAction)
    this.dadosCliente = {}

    this.init()
  }

  adcEventoBotaoAction() {
    this.botaoAction.addEventListener('click', this.handleBotaoAction)
  }

  handleBotaoAction(event) {
    event.preventDefault()
    this.preencherObjetoDadosCliente()
    this.fazerFetchAPI()
  }

  preencherObjetoDadosCliente() {
    this.entradasFormulario.forEach(entrada => {
      const nome = entrada.name
      const valor = entrada.value
      this.dadosCliente[`${nome}`] = valor
    })
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

  fazerBindDosEventos() {
    this.handleBotaoAction = this.handleBotaoAction.bind(this)
  }

  init() {
    if (this.entradasFormulario.length && this.urlAPI && this.botaoAction) {
      this.fazerBindDosEventos()
      this.adcEventoBotaoAction()
    } else {
      console.log('Erro ao carregar o arquivo salvaCliente.js');
    }
  }
}