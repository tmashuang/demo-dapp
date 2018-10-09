
const Web3 = require('web3')

window.addEventListener('load', startApp)

function startApp () {
  if (!window.web3) {
    const main = document.getElementById('main')
    return main.innerHTML = '<h1>No web3 detected</h1>'
  }

  const web3 = new Web3(window.web3.currentProvider)
  global.web3 = web3

  button('call contract on ropsten', () => {
    web3.eth.getAccounts().then(accounts => {

      var abi = [{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"closingTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"openingTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_rate","type":"uint256"},{"name":"_openingTime","type":"uint256"},{"name":"_closingTime","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"}],"name":"setToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"hasClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"remainingSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"burnTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

      var contract = new web3.eth.Contract(abi,'0x96c60DDa637487820AF1858b94b5c732F0beFfD3');
      contract.methods.buyTokens(accounts[0]).send({ from: accounts[0], value: web3.utils.toWei('0.00005', 'ether')})
      .then(receipt => console.log(receipt));

    })
  })
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