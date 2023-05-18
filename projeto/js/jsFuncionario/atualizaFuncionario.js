export default class AtualizaFuncionario {
  constructor(urlAPIUpdate) {
    this.listaDadosChaves = document.querySelectorAll('.lista-dados .chaves')
    this.btnEditar = document.querySelector('.btn-editar-buscar-funcionario')
    this.urlAPIUpdate = urlAPIUpdate
    this.objFuncionario = {}

    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    this.preencherObjFuncionario()
    
    if (this.verificarAtributoNuloObjFuncionario()) {
      alert('TODOS OS DADOS DO FUNCIONARIO PRECISAM ESTAR PREENCHIDOS!')
    } else {
      this.preencheFormAtualizaFuncionario = new PreencheFormAtualizaFuncionario(this.objFuncionario, this.urlAPIUpdate)
    }

  }

  preencherObjFuncionario() {
    this.listaDadosChaves.forEach(spanChave => {
      const textSpanChaveMinusculo = spanChave.innerText.toLowerCase()
      const valorChave = spanChave.nextElementSibling.innerText
      this.objFuncionario[textSpanChaveMinusculo] = valorChave
    })
  }

  verificarAtributoNuloObjFuncionario() {
    let valorNulo = []

    for(let atr in this.objFuncionario) {
      if (atr !== 'complemento') {
        if (this.objFuncionario.hasOwnProperty(atr) && 
            (this.objFuncionario[atr] !== '' && this.objFuncionario[atr] !== undefined && this.objFuncionario[atr] !== null)) {
          valorNulo.push(false)
        } else {
          valorNulo.push(true)
        }
      }
    }

    return valorNulo.some(valor => {
      return valor == true
    })
  }

  init() {
    if (this.listaDadosChaves.length && this.btnEditar && this.urlAPIUpdate) {
      this.btnEditar.addEventListener('click', this.handleClick.bind(this))
    } else {
      console.log('Erro ao carregar atualizaFuncionario.js');
    }
  }
}

class PreencheFormAtualizaFuncionario {
  constructor(objFuncionario, urlAPIUpdate) {
    this.objFuncionario = objFuncionario
    this.urlAPIUpdate = urlAPIUpdate
    this.telas = document.querySelectorAll('.tela')
    this.linksNavegacao = document.querySelectorAll('.link-navegacao')
    this.btnEditarCadastro = document.querySelector('.btn-editar-dados-pessoais')
    this.inputsFormCadastro = document.querySelectorAll('[data-form="cadastro-funcionario"] .data-container')
    this.inputCodigo = document.querySelector('.id-funcionario')
    this.inputCpfBuscaFuncionario = document.querySelector('#cpf-busca')

    this.fazerFetchURLUpdate = this.fazerFetchURLUpdate.bind(this)
    this.init()
  }

  alterarTelaAtiva() {
    this.telas.forEach(tela => {
      tela.classList.toggle('active')
      tela.classList.toggle('show')
    })
    
    this.linksNavegacao.forEach(link => {
      link.classList.toggle('active')
    })
  }

  preencherFormularioCadastro() {
    this.inputCodigo.value = this.objFuncionario['id']
    
    this.inputsFormCadastro.forEach(input => {
      const nomeInput = input.name
      if(nomeInput === 'cpf')
        input.value = this.inputCpfBuscaFuncionario.value
      else
        input.value = this.objFuncionario[nomeInput]
    })
  }

  removerIdEInserirCpfObjFuncionario() {
    delete this.objFuncionario.id
    this.objFuncionario['cpf'] = this.inputCpfBuscaFuncionario.value
  }

  atualizarObjFuncionario({target}) {
    setTimeout(() =>{
      this.inputsFormCadastro.forEach(input => {
        this.objFuncionario[input.name] = input.value
      })
    }, 1000)
  }

  fazerFetchURLUpdate(event) {
    event.preventDefault()
    this.urlAPIUpdate = this.atualizarURLAPIUpdate()

    fetch(this.urlAPIUpdate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.objFuncionario)
    })

    .then(response => {
      if (response.status === 404) {
        alert('FUNCIONARIO NÃO ENCONTRADO')
        return response.json()
      } else {
        alert('FUNCIONARIO ATUALIZADO COM SUCESSO')
        return response.json()
      }
    })

    .then(funcionario => console.log(funcionario))
    
    .finally(() => {
      this.btnEditarCadastro.removeEventListener('click', this.fazerFetchURLUpdate)
    })
  }

  atualizarURLAPIUpdate() {
    return this.urlAPIUpdate.replace(/\/[^/]+$/g, '/' + this.inputCodigo.value)
  }

  init() {
    this.alterarTelaAtiva()
    this.preencherFormularioCadastro()
    this.removerIdEInserirCpfObjFuncionario()
    this.inputsFormCadastro.forEach(input => {
      input.addEventListener('change', this.atualizarObjFuncionario.bind(this))
    })
    this.btnEditarCadastro.addEventListener('click', this.fazerFetchURLUpdate)
  }
}