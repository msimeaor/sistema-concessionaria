export default class BuscaCep {
  constructor(formulario) {
    this.formularioEndereco = formulario.querySelectorAll('.data-endereco')
    this.inputCep = formulario.querySelector("#cep")

    this.init()
  }

  fazerFetchAPIBuscaCep() {
    fetch(`https://viacep.com.br/ws/${this.inputCep.value}/json/`)
      .then(response => response.json())
      .then(endereco => {
        this.preencherEnderecoAutomaticamente(endereco)
      })
  }

  preencherEnderecoAutomaticamente(endereco) {
    let arrayInputsEndereco = Object.values(this.formularioEndereco)

    let arrayAtributosEndereco = [
      endereco.logradouro, endereco.cep, 
      endereco.bairro, endereco.localidade, 
      endereco.uf
    ]

    for(let i=0 ; i<arrayInputsEndereco.length ; i++) {
      if (arrayAtributosEndereco[i] == undefined) {
        this.formatarInputInvalido()
      } else {
        arrayInputsEndereco[i].value = arrayAtributosEndereco[i]
      }
    }
  }

  formatarInputInvalido() {
    this.inputCep.classList.remove('input-valido')
    this.inputCep.classList.add('input-invalido')
    this.inputCep.previousElementSibling.classList.remove('label-valido')
    this.inputCep.previousElementSibling.classList.add('label-invalido')
    this.inputCep.value = ''
    this.inputCep.focus()
  }

  init() {
    if (this.formularioEndereco && this.inputCep) {
      this.fazerFetchAPIBuscaCep()
    } else {
      console.log('Erro ao carregar buscaCep.js');
    }
  }
}