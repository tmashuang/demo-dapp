const EthQuery = require('eth-query')
const EthUtil = require('ethereumjs-util')
const Eth = require('ethjs')
const eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'))

window.addEventListener('load', startApp)

function startApp () {
  if (!window.web3) {
    const main = document.getElementById('main')
    return main.innerHTML = '<h1>No web3 detected</h1>'
  }
  const provider = web3.currentProvider
  const query = new EthQuery(provider)
  let account, txReceipt
  account = query.accounts((err, res) => {
    if (err) return showError(err)
    account = res[0]
    console.log(account)  
  })
  
  button('gasPrice', () => query.gasPrice(buffOut))
  button('estimateGas', () => query.estimateGas({from: account, to: account}, buffOut))
  button('blockNumber', () => query.blockNumber(buffOut))
  button('accounts', () => query.accounts((err, res) => {
    if (err) return showError(err)
    account = res[0]
    console.log(account)  
  })
)
  button('getBlockByNumber', () => query.getBlockByNumber(buffOut))
  button('sendTransaction', () => query.sendTransaction({from: account, to: account}, (err, res) => {
    if (err) return showError(err)
    txReceipt = res
  }))
  button('sendTransactionEmptyString', () => query.sendTransaction({from: account, to: ''}, (err, res) => {
    if (err) return showError(err)
    txReceipt = res
  }))
  button('sendTransaction0x', () => query.sendTransaction({from: account, to: '0x'}, (err, res) => {
    if (err) return showError(err)
    txReceipt = res
  }))
  button('getTransactionReceipt', () => query.getTransactionReceipt(txReceipt, handleResult))
  button('getBlockByHash', () => query.getBlockByHash(handleResult))
  button('getBlockTransactionCountByHash', () => query.getBlockTransactionCountByHash(handleResult))
  button('getBlockTransactionCountByNumber', () => query.getBlockTransactionCountByNumber(handleResult))
  // button('sendTransaction', () => query.sendTransaction({from: account, to: contract, gasPrice: '0x4a817c800'}, handleResult))
  // button('sendTransaction', () => query.sendTransaction({from: account, to: contract, gasPrice: '0x9502f9000'}, handleResult))
  button('getTransactionByHash', () => query.getTransactionByHash(handleResult))
  button('getTransactionCount', () => query.getTransactionCount(handleResult))
  button('getStorageAt', () => query.getStorageAt(account, 1, handleResult))
  button('getBalance', () => query.getBalance(account, handleResult))
  // button('deploy contract', () => simpleStore.new({}).then(function(txHash) {
    
  // }))
}

// function watchContract () {
//   var myEvent = contract.Evt({}, {fromBlock: 0, toBlock: 'latest'})
//   myEvent.watch(function(err, result) {
//     console.log('on watch')
//     console.log(arguments)
//   })
// }

function transactionReceipt (err, res) {
  if (err) return showError(err)
  console.log(res)
}

// function getBalance (hex) {  
//   const shit = EthUtil.bufferToInt(hex)
//   console.log(JSON.stringify(shit))
// }

function buffOut (err, res) {
  if (err) return showError(err)
  console.log(EthUtil.bufferToInt(res))
}

function handleResult (err, result)  {
  if (err) return showError(err) && console.log(err)
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