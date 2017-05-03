const EthQuery = require('eth-query')
const EthUtil = require('ethereumjs-util')

window.addEventListener('load', startApp)

function startApp () {
  if (!window.web3) {
    const main = document.getElementById('main')
    return main.innerHTML = '<h1>No web3 detected</h1>'
  }
  const provider = web3.currentProvider
  const query = new EthQuery(provider)
  let account = web3.eth.accounts[0]
  button('getBalance', () => query.getBalance(account, handleResult))
  // TODOS:
  // button('gasPrice', () => query.gasPrice(handleResult)
  // button('getTransactionCount', () => query.(,handleResult)
  // button('getStorageAt', () => query.(,handleResult)
  // button('accounts', () => query.(,handleResult)
  // button('blockNumber', () => query.(,handleResult)
  // button('getBlockTransactionCountByHash', () => query.(,handleResult)
  // button('getBlockTransactionCountByNumber', () => query.(,handleResult)
  // button('sendTransaction', () => query.(,handleResult)
  // button('estimateGas', () => query.(,handleResult)
  // button('getBlockByHash', () => query.(,handleResult)
  // button('getBlockByNumber', () => query.(,handleResult)
  // button('getTransactionByHash', () => query.(,handleResult)
  // button('getTransactionReceipt', () => query.(,handleResult)

}

function handleResult (err, result)  {
  if (err) return showError(err)
  console.log(result)
}




function button (id, cb) {
  const main = document.getElementById('main')
  const button = document.createElement('BUTTON')
  button.id = id
  button.innerText = id
  button.addEventListener('click', cb)
  main.appendChild(button)
}

function showError (message) {
  var errContainer = document.getElementById('err')
  errContainer.style.background = ' #ffd6cc'
  errContainer.style.color = '#ff471a'
  errContainer.innerText = message
}
