var lib = require('./lib/lib'); 
var Boo = require('./BooTransfer)
var path = require('path');
const fs = require('fs');
var os = require('os'); 
const Downloadselector = "#share-download-func-submit";

(async () => {
  browser=await lib.getBrowser()
  const page = await browser.newPage();
  if(process.argc<3){
  console("You must enter url");
    exit;
  }
  DownloadPath=process.env.HOME+"/Downloads/"
  let TempPath;
  fs.mkdtemp(path.join(os.tmpdir(), 'hdownoloader-'), (err, folder) => {
  if (err) throw err;
    TempPath=folder
  });
  if(process.argc>=4)
    DownloadPath=process.argv[3];
  console.log("Download Path :"+DownloadPath)
  url=process.argv[2];
  console.log("Go to "+url);
  await page.goto(url);
  await page.waitForSelector(Downloadselector,10000);
  await page._client.send('Page.setDownloadBehavior', {
         behavior: 'allow',
         downloadPath: TempPath
   });
  const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

  async function waitForFileToDownload() {
        console.log('Waiting for download complete...')
        let filename
        while (!filename || filename.endsWith('.crdownload')) {
            filename = fs.readdirSync(TempPath).pop();
            await sleep(1000)
        }
        return filename
  }
  await page.click(Downloadselector);
  filename=await waitForFileToDownload();
  fs.renameSync(path.join(TempPath,filename),path.join(DownloadPath,filename));
console.log(filename+" download Complete");
  await browser.close();
})();
