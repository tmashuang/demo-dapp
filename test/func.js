const path = require('path')
const webdriver = require('selenium-webdriver')
const fs = require('fs')

exports.delay = function delay (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

exports.buildWebDriver = function buildWebDriver () {
  // Path needs to have the crx file extension
  // Do not neccessarily need path.resolve
  const extPath = path.resolve('../demo-dapp/test/Metamask3_12_0.crx')
  const data = fs.readFileSync(extPath)

  //Extension needs to be base64 encoded
  const encodedExtension = data.toString('base64')

  return new webdriver.Builder()
    .withCapabilities({
      chromeOptions: {
        extensions: [encodedExtension]
      },
    })
    // Browser specification can be moved to package.json test script as SELENIUM_BROWSER=<browser> env variable
    .forBrowser('chrome')
    .build()
}