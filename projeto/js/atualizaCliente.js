export default class AtualizaCliente {
  constructor(urlAPIUpdate) {
    this.listaDados = document.querySelector('.lista-dados-cliente')
    this.listaDadosChaves = this.listaDados.querySelectorAll('.chaves')
    this.btnEditar = document.querySelector('.btn-editar-buscar-cliente')
    this.urlAPIUpdate = urlAPIUpdate
    this.objCliente = {}

    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    this.criarObjCliente()
    
    if (this.verificarAtributoNuloObjCliente()) {
      alert('TODOS OS DADOS DO CLIENTE PRECISAM ESTAR PREENCHIDOS!')
    } else {
      const preencheFormAtualizaCliente = new PreencheFormAtualizaCliente(this.objCliente, this.urlAPIUpdate)
    }

  }

  criarObjCliente() {
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
    if (this.listaDados && this.btnEditar && this.urlAPIUpdate) {
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
    this.telaBuscaCliente = document.querySelector('.tela-busca-cliente')
    this.telaCadastroCliente = document.querySelector('.tela-cadastro-cliente')
    this.linkCadastroCliente = document.querySelector('.link-cadastro-cliente')
    this.linkBuscaCliente = document.querySelector('.link-busca-cliente')
    this.btnEditarCadastro = document.querySelector('.btn-editar-dados-pessoais')
    this.formCadastro = document.querySelector('[data-form="cadastro-cliente"]')
    this.inputsFormCadastro = this.formCadastro.querySelectorAll('.data-container')
    this.inputCodigo = document.querySelector('.id-cliente')
    this.inputCpf = document.querySelector('#cpf-busca')
    this.idCliente = this.objCliente['id']

    this.init()
  }

  alterarTelaAtiva() {
    this.telaBuscaCliente.classList.remove('show', 'active')
    this.linkBuscaCliente.classList.remove('active')

    this.telaCadastroCliente.classList.add('show', 'active')
    this.linkCadastroCliente.classList.add('active')
  }

  preencherFormularioCadastro() {
    this.inputCodigo.value = this.idCliente
    
    this.inputsFormCadastro.forEach(input => {
      const nomeInput = input.name
      if(nomeInput === 'cpf')
        input.value = this.inputCpf.value
      else
        input.value = this.objCliente[nomeInput]
    })
  }

  // PREPARA O OBJETO CLIENTE QUE VAI SER PASSADO NO BODY DA FETCH
  removerIdEInserirCpfObjCliente() {
    delete this.objCliente.id
    this.objCliente['cpf'] = this.inputCpf.value
  }

  atualizarObjCliente({target}) {
    this.objCliente[target.name] = target.value
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
  }

  atualizarURLAPIUpdate() {
    return this.urlAPIUpdate.replace(/\/[^/]+$/g, '/' + this.inputCodigo.value)
  }

  init() {
    this.alterarTelaAtiva()
    this.preencherFormularioCadastro()
    this.removerIdEInserirCpfObjCliente()
    this.formCadastro.addEventListener('change', this.atualizarObjCliente.bind(this))
    this.btnEditarCadastro.addEventListener('click', this.fazerFetchURLUpdate.bind(this))
  }
}