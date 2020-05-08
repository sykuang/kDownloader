import * as path from 'path';
import * as fs from 'fs';
import * as  os from 'os';
import * as  lib from './lib/helper';
import operation from 'retry'
const TakeMeBtn : string = "#shorturl-go > strong";
const CloseBtn : string = "#btnCloseP";
export async function getBooURL(browser : any, url : string) : Promise<any> {
  const page = await browser.newPage();
  await page.goto(url, 30000, "domcontentloaded");
  for (var i = 0; i < 2; i++) {
    var cnt : number = i + 2;
    var CloseBtnWithIndex : string = CloseBtn + cnt + ""
    await page.waitForSelector(CloseBtnWithIndex, 20000);
    if (page.$(CloseBtnWithIndex)) {
      try { await page.click(CloseBtnWithIndex) }
      catch{ }
    }
    await lib.sleep(20000)
    await page.waitForSelector(TakeMeBtn, 100000);
    try { await page.click(TakeMeBtn) }
    catch (error) { console.log("Cannot find the button") }
  }
  return page
}
let main = async function() : Promise<void> {
  const retry = import('retry');
  const browser = await lib.getBrowser()
  const urls : Array<string> = process.argv.slice(2);
  for (const url of urls) {
    let page = await getBooURL(browser, url);
    let checkUrl = await page.evaluate(() => location.href)
    console.log(checkUrl)
  }
  browser.close();
}
if (require.main === module) {
  main();
}
