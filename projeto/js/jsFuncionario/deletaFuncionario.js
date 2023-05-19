export default class DeletaFuncionario {
  constructor(urlFetchAPI) {
    this.urlFetchAPI = urlFetchAPI
    this.btnDeletar = document.querySelector('.btn-excluir-buscar-funcionario')
    this.listaDadosFuncionario = document.querySelector('.lista-dados')
    this.idListaDadosFuncionario = this.listaDadosFuncionario.querySelectorAll('.valores')[0]

    this.init()
  }

  handleClick(event) {
    event.preventDefault()
    const valorIdFuncionario = this.idListaDadosFuncionario.innerText
    this.atualizarURLFetch(valorIdFuncionario)
    this.fazerFetchURLDelete()
  }

  atualizarURLFetch(valorIdFuncionario) {
    this.urlFetchAPI = this.urlFetchAPI.replace(/\/[^/]+$/g, '/' + valorIdFuncionario)
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
        alert('FUNCIONÁRIO NÃO ENCONTRADO!')
        return response.json()
      } else {
        alert('FUNCIONÁRIO DELETADO COM SUCESSO!')
        return response.json()
      }
    })
    .then(retorno => console.log(retorno))
  }

  init() {
    if (this.urlFetchAPI && this.btnDeletar && this.idListaDadosFuncionario) {
      this.btnDeletar.addEventListener('click', this.handleClick.bind(this))
    } else {
      console.log('Erro ao carregar deletaFuncionario.js');
    }
  }

}