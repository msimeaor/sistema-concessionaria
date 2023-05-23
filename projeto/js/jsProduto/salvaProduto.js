export default class SalvaProduto {
  constructor(urlAPI) {
    this.urlAPI = urlAPI
    this.inputCodigo = document.querySelector('[data-form="cadastro-produto"] .id-produto')
    this.entradasFormulario = document.querySelectorAll('[data-form="cadastro-produto"] .data-container')
    this.botaoAction = document.querySelector('.btn-salvar-dados-produto')
    this.dadosProduto = {}

    this.init()
  }

  handleBotaoAction(event) {
    event.preventDefault()
    this.preencherObjetoDadosProduto()
    console.log(this.dadosProduto);

    if (this.verificarInputsNulos()) {
      alert('COM EXCESSÃO DE PLACA, TODOS OS CAMPOS DEVEM SER PREENCHIDOS!')
    } else {
      this.fazerFetchAPI()
    }
    
  }

  preencherObjetoDadosProduto() {
    this.entradasFormulario.forEach(entrada => {
      const nome = entrada.name
      let valor = entrada.value

      if (nome === 'preco') {
        valor = this.limparPreco(valor)
      }

      this.dadosProduto[`${nome}`] = valor
    })
  }

  limparPreco(valor) {
    const novoValor = valor
      .replace('R$', '')
      .replace('.', '')
      .replace(',', '.')
      .trim()

    return novoValor
  }

  verificarInputsNulos() {
    let arrayDadosProduto = []

    for(let atr in this.dadosProduto) {
      if (this.dadosProduto.hasOwnProperty(atr)) {
        if (atr != 'placa') {
          const valor = this.dadosProduto[atr]
          arrayDadosProduto.push(valor)
        }
      }
    }

    return arrayDadosProduto.some(valor => valor == false)
  }

  fazerFetchAPI() {
    fetch(this.urlAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.dadosProduto)
    })

    .then(response => {
      if (response.status === 201) {
        return response.json()
      } else {
        alert('ERRO AO CADASTRAR PRODUTO')
        return response.json()
      }
    })

    .then(produto => {
      alert(`PRODUTO CADASTRADO COM SUCESSO!`)
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
      console.log('Erro ao carregar o arquivo salvaProduto.js');
    }
  }
}