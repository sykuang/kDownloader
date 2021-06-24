import * as  lib from './lib/helper';
import * as argparse from 'argparse';
import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const TakeMeBtn: string = "#shorturl-go > strong";
const CloseBtn: string = "#btnCloseP";
export async function getBooURL(browser: any, url: string): Promise<any> {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  logger.debug("goto: ", url);
  await page.goto(url);
  for (var i = 0; i < 2; i++) {
    var cnt: number = i + 1;
    var CloseBtnWithIndex: string = CloseBtn + cnt + ""
    logger.debug("Waiting for ", CloseBtnWithIndex);
    try {
      await page.waitForSelector(CloseBtnWithIndex, 20000);
      await page.click(CloseBtnWithIndex);
    }
    catch {
      logger.error("Click %s failed!", CloseBtnWithIndex);
      if (i != 0) {
        return page;
      }
    }
    finally {logger.debug("Click %s done", CloseBtnWithIndex);}
    await lib.sleep(20000)
    logger.debug("Waiting for ", TakeMeBtn);
    try {
      await page.waitForSelector(TakeMeBtn, 100000);
      await page.click(TakeMeBtn);
    }
    catch (error) {logger.error("Click %s failed", TakeMeBtn)};
  }
  return page
}
let main = async function (): Promise<void> {
  prefix.reg(logger);
  logger.setLevel("warn");
  const parser = new argparse.ArgumentParser({description: "Boo transfer"});
  parser.add_argument('url', {help: 'Urls to transfer', type: "str", nargs: "+"});
  parser.add_argument('--debug', {help: 'Enable debug mode', action: 'store_true'});
  const args = parser.parse_args();
  if (args.debug) {
    logger.setLevel("trace");
  }
  prefix.apply(logger);
  const urls: Array<string> = args.url;
  const browser = await lib.getBrowser(!args.debug)
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
