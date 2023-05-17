export default class SalvaFuncionario {
  constructor(urlAPI) {
    this.urlAPI = urlAPI
    this.inputCodigo = document.querySelector('[data-form="cadastro-funcionario"] .id-funcionario')
    this.entradasFormulario = document.querySelectorAll('[data-form="cadastro-funcionario"] .data-container')
    this.botaoAction = document.querySelector('.btn-salvar-dados-pessoais')
    this.dadosFuncionario = {}

    this.init()
  }

  handleBotaoAction(event) {
    event.preventDefault()
    this.preencherObjetoDadosFuncionario()

    if (this.verificarInputsNulos()) {
      alert('Com excessão de "complemento", todos os campos devem ser preenchidos')
    } else {
      this.fazerFetchAPI()
    }
    
  }

  preencherObjetoDadosFuncionario() {
    this.entradasFormulario.forEach(entrada => {
      const nome = entrada.name
      const valor = entrada.value
      this.dadosFuncionario[`${nome}`] = valor
    })
  }

  verificarInputsNulos() {
    let arrayDadosFuncionario = []

    for(let atr in this.dadosFuncionario) {
      if (this.dadosFuncionario.hasOwnProperty(atr)) {
        if (atr != 'complemento') {
          const valor = this.dadosFuncionario[atr]
          arrayDadosFuncionario.push(valor)
        }
      }
    }

    return arrayDadosFuncionario.some(valor => valor == false)
  }

  fazerFetchAPI() {
    fetch(this.urlAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.dadosFuncionario)
    })

    .then(response => {
      if (response.status === 201) {
        return response.json()
      } else {
        alert('ERRO AO CADASTRAR FUNCIONÁRIO!')
        return response.json()
      }
    })

    .then(funcionario => {
      alert(`FUNCIONÁRIO CADASTRADO COM SUCESSO!`)
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
      console.log('Erro ao carregar o arquivo salvaFuncionario.js');
    }
  }
}