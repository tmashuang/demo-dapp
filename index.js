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
  const account = '0xedDbB091d94d4a11084A4306Bb945F509Fd51dB4'
  

  // var contractABi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]
  const contract = '0xF74176bD80708bab197a0b5063C57440fd9feA59'
  

  button('gasPrice', () => query.gasPrice(buffOut))
  button('accounts', () => query.accounts(handleResult))
  button('blockNumber', () => query.blockNumber(buffOut))
  button('getBlockTransactionCountByHash', () => query.getBlockTransactionCountByHash(handleResult))
  button('getBlockTransactionCountByNumber', () => query.getBlockTransactionCountByNumber(handleResult))
  button('sendTransaction', () => query.sendTransaction({from: account, to: contract, gasPrice: 123456}, handleResult))
  button('estimateGas', () => query.estimateGas({from: account, to: contract}, buffOut))
  button('getBlockByHash', () => query.getBlockByHash(handleResult))
  button('getBlockByNumber', () => query.getBlockByNumber(buffOut))
  button('getTransactionByHash', () => query.getTransactionByHash(handleResult))
  button('getTransactionReceipt', () => query.getTransactionReceipt(receipt, handleResult))
  button('getTransactionCount', () => query.getTransactionCount(handleResult))
  button('getStorageAt', () => query.getStorageAt(account, 1, handleResult))
  button('getBalance', () => query.getBalance(account, handleResult))

}

function transactionReceipt (err, res) {
  if (err) return showError(err)
  console.log(res)
}

// function getBalance (hex) {  
//   const shit = EthUtil.bufferToInt(hex)
//   console.log(JSON.stringify(shit))
// }

function buffOut (err, res) {
  if (err) return showError(error)
  console.log(EthUtil.bufferToInt(res))
}

function handleResult (err, result)  {
  if (err) return showError(err)
    console.log(result)
}


function button (id, cb) {
  const main = document.getElementById('main')
  const button = document.createElement('BUTTON')
  const linebreak = document.createElement('br')
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