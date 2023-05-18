export default class DeletaCliente {
  constructor(urlFetchAPI) {
    this.urlFetchAPI = urlFetchAPI
    this.btnDeletar = document.querySelector('.btn-excluir-buscar-cliente')
    this.listaDadosCliente = document.querySelector('.lista-dados')
    this.idListaDadosCliente = this.listaDadosCliente.querySelectorAll('.valores')[0]

    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    const valorIdCliente = this.idListaDadosCliente.innerText
    this.atualizarURLFetch(valorIdCliente)
    this.fazerFetchURLDelete()
  }

  atualizarURLFetch(valorIdCliente) {
    this.urlFetchAPI = this.urlFetchAPI.replace(/\/[^/]+$/g, '/' + valorIdCliente)
  }

  fazerFetchURLDelete() {
    fetch(this.urlFetchAPI, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 404) {
        alert('CLIENTE NÃO ENCONTRADO!')
        return response.json()
      } else {
        alert('CLIENTE DELETADO COM SUCESSO!')
        return response.json()
      }
    })
    .then(retorno => console.log(retorno))
  }

  init() {
    if (this.urlFetchAPI && this.btnDeletar && this.idListaDadosCliente) {
      this.btnDeletar.addEventListener('click', this.handleClick.bind(this))
    } else {
      console.log('Erro ao carregar deletaCliente.js');
    }
  }

}