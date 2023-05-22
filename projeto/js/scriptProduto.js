import SalvaProduto from "./jsProduto/salvaProduto.js"

function fazerFetchURLs(endp, Classe) {
  fetch('/projeto/json/produtoAPI.json')
    .then(response => response.json())
    .then(data => {
      const endpoint = data[endp]
      const classe = new Classe(endpoint)
    })
}

fazerFetchURLs('save', SalvaProduto)