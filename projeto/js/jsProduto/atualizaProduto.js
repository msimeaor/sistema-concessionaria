export default class AtualizaProduto {
  constructor(urlAPIUpdate) {
    this.listaDadosChaves = document.querySelectorAll('.lista-dados .chaves')
    this.btnEditar = document.querySelector('.btn-editar-buscar-produto')
    this.urlAPIUpdate = urlAPIUpdate
    this.objProduto = {}

    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    this.preencherObjProduto()
    
    if (this.verificarAtributoNuloObjProduto()) {
      alert('TODOS OS DADOS DO PRODUTO PRECISAM ESTAR PREENCHIDOS!')
    } else {
      this.preencheFormAtualizaProduto = new PreencheFormAtualizaProduto(this.objProduto, this.urlAPIUpdate)
    }

  }

  preencherObjProduto() {
    this.listaDadosChaves.forEach(spanChave => {
      const textSpanChaveMinusculo = spanChave.innerText.toLowerCase()
      const valorChave = spanChave.nextElementSibling.innerText
      this.objProduto[textSpanChaveMinusculo] = valorChave
    })
  }

  verificarAtributoNuloObjProduto() {
    let valorNulo = []

    for(let atr in this.objProduto) {
      if (atr !== 'placa') {
        if (this.objProduto.hasOwnProperty(atr) && 
            (this.objProduto[atr] !== '' && this.objProduto[atr] !== undefined && this.objProduto[atr] !== null)) {
          valorNulo.push(false)
        } else {
          valorNulo.push(true)
        }
      }
    }

    return valorNulo.some(valor => valor == true)
  }

  init() {
    if (this.listaDadosChaves.length && this.btnEditar && this.urlAPIUpdate) {
      this.btnEditar.addEventListener('click', this.handleClick.bind(this))
    } else {
      console.log('Erro ao carregar atualizaProduto.js');
    }
  }
}

class PreencheFormAtualizaProduto {
  constructor(objProduto, urlAPIUpdate) {
    this.objProduto = objProduto
    this.urlAPIUpdate = urlAPIUpdate
    this.telas = document.querySelectorAll('.tela')
    this.linksNavegacao = document.querySelectorAll('.link-navegacao')
    this.btnEditarCadastro = document.querySelector('.btn-editar-dados-produto')
    this.inputsFormCadastro = document.querySelectorAll('[data-form="cadastro-produto"] .data-container')
    this.inputCodigo = document.querySelector('.id-produto')
    this.inputChassiBuscaProduto = document.querySelector('#chassi-busca')

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
    this.inputCodigo.value = this.objProduto['id']
    
    this.inputsFormCadastro.forEach(input => {
      const nomeInput = input.name
      if(nomeInput === 'chassi')
        input.value = this.inputChassiBuscaProduto.value
      else
        input.value = this.objProduto[nomeInput]
    })
  }

  removerIdEInserirChassiObjProduto() {
    delete this.objProduto.id
    this.objProduto['chassi'] = this.inputChassiBuscaProduto.value
  }

  atualizarObjProduto() {
    this.inputsFormCadastro.forEach(input => {
      setTimeout(() => {
        this.objProduto[input.name] = input.value
      }, 100)
    })
  }

  fazerFetchURLUpdate(event) {
    event.preventDefault()
    this.urlAPIUpdate = this.atualizarURLAPIUpdate()
    this.formatarPreco()

    fetch(this.urlAPIUpdate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.objProduto)
    })

    .then(response => {
      if (response.status === 404) {
        alert('PRODUTO NÃO ENCONTRADO!')
        return response.json()
      } else {
        alert('PRODUTO ATUALIZADO COM SUCESSO')
        return response.json()
      }
    })

    .then(produto => console.log(produto))
    
    .finally(() => {
      this.btnEditarCadastro.removeEventListener('click', this.fazerFetchURLUpdate)
    })
  }

  atualizarURLAPIUpdate() {
    return this.urlAPIUpdate.replace(/\/[^/]+$/g, '/' + this.inputCodigo.value)
  }

  formatarPreco() {
    this.objProduto['preco'] = +this.objProduto['preco']
    .replace('R$', '')
    .replace('.', '')
    .replace(',', '.')
  }

  init() {
    this.alterarTelaAtiva()
    this.preencherFormularioCadastro()
    this.removerIdEInserirChassiObjProduto()
    this.inputsFormCadastro.forEach(input => {
      input.addEventListener('change', this.atualizarObjProduto.bind(this))
    })
    this.btnEditarCadastro.addEventListener('click', this.fazerFetchURLUpdate)
  }
}