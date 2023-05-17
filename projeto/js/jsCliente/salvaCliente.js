export default class SalvaCliente {
  constructor(urlAPI) {
    this.urlAPI = urlAPI
    this.inputCodigo = document.querySelector('[data-form="cadastro-cliente"] .id-cliente')
    this.entradasFormulario = document.querySelectorAll('[data-form="cadastro-cliente"] .data-container')
    this.botaoAction = document.querySelector('.btn-salvar-dados-pessoais')
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
      this.limparFormulario()
      this.resetarFormatacoesInputELabel()
    })
    
    .catch(error => {
      console.log(error);
    })
  }

  limparFormulario() {
    this.entradasFormulario.forEach(entrada => {
      entrada.value = ''
    })
    this.inputCodigo.value = ''
  }

  resetarFormatacoesInputELabel() {
    this.entradasFormulario.forEach(entrada => {
      entrada.classList.remove('input-valido')
      entrada.previousElementSibling.classList.remove('label-valido')
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