const puppeteer = require('puppeteer');
async function getBrowser(){
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  return browser
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
module.exports = {
  getBrowser,
  sleep
};
