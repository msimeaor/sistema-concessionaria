export default class AtualizaCliente {
  constructor(urlAPIUpdate) {
    this.listaDadosChaves = document.querySelectorAll('.lista-dados-cliente .chaves')
    this.btnEditar = document.querySelector('.btn-editar-buscar-cliente')
    this.urlAPIUpdate = urlAPIUpdate
    this.objCliente = {}

    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    this.preencherObjCliente()
    
    if (this.verificarAtributoNuloObjCliente()) {
      alert('TODOS OS DADOS DO CLIENTE PRECISAM ESTAR PREENCHIDOS!')
    } else {
      this.preencheFormAtualizaCliente = new PreencheFormAtualizaCliente(this.objCliente, this.urlAPIUpdate)
    }

  }

  preencherObjCliente() {
    this.listaDadosChaves.forEach(spanChave => {
      const textSpanChaveMinusculo = spanChave.innerText.toLowerCase()
      const valorChave = spanChave.nextElementSibling.innerText
      this.objCliente[textSpanChaveMinusculo] = valorChave
    })
  }

  verificarAtributoNuloObjCliente() {
    let valorNulo = []

    for(let atr in this.objCliente) {
      if (atr !== 'complemento') {
        if (this.objCliente.hasOwnProperty(atr) && 
            (this.objCliente[atr] !== '' && this.objCliente[atr] !== undefined && this.objCliente[atr] !== null)) {
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
      console.log('Erro ao carregar atualizaCliente.js');
    }
  }
}

class PreencheFormAtualizaCliente {
  constructor(objCliente, urlAPIUpdate) {
    this.objCliente = objCliente
    this.urlAPIUpdate = urlAPIUpdate
    this.telas = document.querySelectorAll('.tela')
    this.linksNavegacao = document.querySelectorAll('.link-navegacao')
    this.btnEditarCadastro = document.querySelector('.btn-editar-dados-pessoais')
    this.inputsFormCadastro = document.querySelectorAll('[data-form="cadastro-cliente"] .data-container')
    this.inputCodigo = document.querySelector('.id-cliente')
    this.inputCpfBuscaCliente = document.querySelector('#cpf-busca')

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
    this.inputCodigo.value = this.objCliente['id']
    
    this.inputsFormCadastro.forEach(input => {
      const nomeInput = input.name
      if(nomeInput === 'cpf')
        input.value = this.inputCpfBuscaCliente.value
      else
        input.value = this.objCliente[nomeInput]
    })
  }

  removerIdEInserirCpfObjCliente() {
    delete this.objCliente.id
    this.objCliente['cpf'] = this.inputCpfBuscaCliente.value
  }

  atualizarObjCliente({target}) {
    setTimeout(() =>{
      this.inputsFormCadastro.forEach(input => {
        this.objCliente[input.name] = input.value
      })
    }, 100)
  }

  fazerFetchURLUpdate(event) {
    event.preventDefault()
    this.urlAPIUpdate = this.atualizarURLAPIUpdate()

    fetch(this.urlAPIUpdate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.objCliente)
    })

    .then(response => {
      if (response.status === 404) {
        alert('CLIENTE NÃO ENCONTRADO')
        return response.json()
      } else {
        alert('CLIENTE ATUALIZADO COM SUCESSO')
        return response.json()
      }
    })

    .then(cliente => console.log(cliente))
    
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
    this.removerIdEInserirCpfObjCliente()
    this.inputsFormCadastro.forEach(input => {
      input.addEventListener('change', this.atualizarObjCliente.bind(this))
    })
    this.btnEditarCadastro.addEventListener('click', this.fazerFetchURLUpdate)
  }
}