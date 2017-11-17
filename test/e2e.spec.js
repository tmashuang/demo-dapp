const assert = require('assert')
const webdriver = require('selenium-webdriver')
const { delay, buildWebDriver } = require('./func')

const By = webdriver.By

describe('Initializtion', function () {
  let driver
  this.timeout(0)

  before(async function () {
    driver = buildWebDriver()
    // Gets the extension id
    await driver.get('chrome://extensions-frame')
    const elems = await driver.findElements(By.xpath(
      '//*[@id="nkbihfbeogaeaoehlefnkodbefgpgknn"]'
    ))
    const extensionId = await elems[0].getAttribute('id')
    // Navigates to the extension popup.html to interact 
    await driver.get(`chrome-extension://${extensionId}/popup.html`)
    await delay(500)
  })

  // Quit driver browser when test finish running
  // Usually comment out for debugging and finding elements etc.
  after(async function () {
    await driver.quit()
  })

  describe('Open extension url', () => {
    it('should open metamask', async function () {
      const title = await driver.getTitle()
      assert.equal(title, 'MetaMask Plugin', 'title matches MetaMask Plugin')
    })
  })

  it('should show privacy notice', async () => {
    const privacy = await driver.findElement(By.className(
      'terms-header'
    )).getText()
    assert.equal(privacy, 'PRIVACY NOTICE', 'shows privacy notice')
    driver.findElement(By.css(
      'button'
    )).click()
  })

  it('should show terms of use', async () => {
    await delay(300)
    const terms = await driver.findElement(By.className(
      'terms-header'
    )).getText()
    assert.equal(terms, 'TERMS OF USE', 'shows terms of use')
  })

  it('should be unable to continue without scolling throught the terms of use', async () => {
    const button = await driver.findElement(By.css(
      'button'
    )).isEnabled()
    assert.equal(button, false, 'disabled continue button')
    const element = driver.findElement(By.linkText(
      'Attributions'
    ))
    await driver.executeScript('arguments[0].scrollIntoView(true)', element)
  })

  it('should be able to continue when scrolled to the bottom of terms of use', async () => {
    const button = await driver.findElement(By.css('button'))
    const buttonEnabled = await button.isEnabled()
    await delay(500)
    assert.equal(buttonEnabled, true, 'enabled continue button')
    await button.click()
  })

  // This will go though the import flow comment out seed copying on 106-113 if using this flow.

  it('imports an existing account', async function () {
    await delay(500)
    const importAccountButton = await driver.findElement(By.xpath(
      '//*[@id="app-content"]/div/div[4]/div/div[3]/p'
    ))
    await importAccountButton.click()
  })

  it('input twelve word seed phrase', async function () {
    await delay(300)
    const seedInputTextArea = await driver.findElement(By.className('twelve-word-phrase'))
    seedInputTextArea.sendKeys('input seed phrase')
  })

  it('should accept password with length of eight', async () => {
    await delay(300)
    const passwordBox = await driver.findElement(By.id('password-box'))
    const passwordBoxConfirm = driver.findElement(By.id('password-box-confirm'))
    const button = await driver.findElements(By.css('button'))

    passwordBox.sendKeys('123456789')
    passwordBoxConfirm.sendKeys('123456789')
    await delay(300)
    // Use if going through account creation flow.
    // await button[0].click()
    await button[1].click()
  })

  // For Account Creation
  // it('should show value was created and seed phrase', async () => {
  //   await delay(700)
  //   // Saves seed phrase
  //   this.seedPhase = await driver.findElement(By.className('twelve-word-phrase')).getText()
  //   const continueAfterSeedPhrase = await driver.findElement(By.css('button'))
  //   await continueAfterSeedPhrase.click()
  //   await delay(300)
  // })
  describe('Switch to test network', function () {
    
    it('network indicator click', async function () {
      await delay(300)
      const networkIndicator = await driver.findElement(By.className('network-indicator'))
      await networkIndicator.click()
    })
    
    it('clicks the rinkeby test nework', async function () {
      await delay(300)
      // list networks should have the network as a id/class name
      // needs xpath to work currently
      const rinkeby = await driver.findElement(By.xpath(
        '//*[@id="app-content"]/div/div[2]/span/div/li[4]'
      ))
      await rinkeby.click()
    })
    // Closes Metamask url tab to test popup.
    // If the tab is open, transactions will need to be confirmed in the Metamask tab
    it('Closes tab when account is loaded', async function () {
      await delay(300)
      await driver.close()
    })
  })


  describe('Navigate to dapp', async function () {
    it('gets all window handles', async function () {
      await delay(300)
      const tabs = await driver.getAllWindowHandles()
      // tab[0] will always be the current window, no matter what order the tabs are in Chrome.
      await driver.switchTo().window(tabs[0])
      // If Metamask tab is open tab will be needed to switch. 
      // await driver.switchTo().window(tabs[1])
      await driver.get('https://tmashuang.github.io/demo-dapp')
    })

    it('clicks send transaction button', async function () {
      await delay(300)
      const sendTransactionButton = await driver.findElement(By.id('sendTransaction'))
      await sendTransactionButton.click()
    })
  })

  describe('Metamask Popup in dapp', async function () {
    it('should show Metamask popoup when account is loaded', async function () {
      await delay(300)
      const window = await driver.getAllWindowHandles()
      await driver.switchTo().window(window[1])
    })
    it('Confrim Transaction', async function () {
      await delay(500)
      const submitTransactionButton = await driver.findElement(By.className('confirm'))
      submitTransactionButton.click()  
    })
  })


})