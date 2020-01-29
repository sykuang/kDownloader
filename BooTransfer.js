var path = require('path');
const fs = require('fs');
var os = require('os'); 
var lib = require('./lib/lib'); 
const TakeMeBtn = "#shorturl-go > strong";
const CloseBtn = "#btnCloseP";
/*(async () => {
  browser = await lib.getBrowser()
  const page = await browser.newPage();
  if(process.argc<3){
  console("You must enter url");
    exit;
  }
  url=process.argv[2];

  await page.goto(url,30000,"domcontentloaded");
  for(var i=0;i<2;i++){
    var cnt=i+2;
    CloseBtnWithIndex=CloseBtn+cnt+""
    await page.waitForSelector(CloseBtnWithIndex,10000);
    await page.click(CloseBtnWithIndex)
    await lib.sleep(30000);
    await page.waitForSelector(TakeMeBtn,10000);
    await page.click(TakeMeBtn);
  }
  ret=page.url()
  await browser.close();
  return ret;
})();*/
async function getBooURL(browser,url){
    const page = await browser.newPage();
    await page.goto(url,30000,"domcontentloaded");
    for(var i=0;i<2;i++){
      var cnt=i+2;
      CloseBtnWithIndex=CloseBtn+cnt+""
      await page.waitForSelector(CloseBtnWithIndex,20000);
      if(page.$(CloseBtnWithIndex)){
        try{await page.click(CloseBtnWithIndex)}
        catch{}
      }
      await lib.sleep(20000)
      await page.waitForSelector(TakeMeBtn,100000);
      try{await page.click(TakeMeBtn)}
      catch(error){console.log("Cannot find the button")}
    }
    return page
  }
module.exports.getBooURL=getBooURL
var main = async function () {
  var retry = require('retry')
  var operation = retry.operation();
  operation.attempt(async function(){
  browser=await lib.getBrowser()
  page=await getBooURL(browser,process.argv[2]);
  console.log(page.url())
  browser.close();
  })
}
if (require.main === module) {
  main();
}
