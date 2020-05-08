import * as  puppeteer from 'puppeteer';
export async function getBrowser() : Promise<any> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  return browser
}
export function sleep(ms : number) : Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
