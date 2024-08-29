// const Base = require('./base.js');
// // sudo yum install atk java-atk-wrapper at-spi2-atk gtk3 libXt
// const puppeteer = require('puppeteer');
// const fs = require("fs");

// module.exports = class extends Base {
//   async parseAction() {
//     const { link } = this.get();
//     // 打开一个页面
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//       ignoreDefaultArgs: ['--disable-extensions'],
//     });
//     const page = await browser.newPage();
//     // 设置下 userAgent 不然会被拦截
//     await page.setUserAgent(
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
//     );
//     await page.goto(link, {
//       timeout: 100 * 1000,
//     });
//     await page.waitForTimeout(3000);
//     const html = await page.content();
//     await page.screenshot({ path: './test12.png' });
//     fs.writeFileSync("./test.html", html)
//     const video = await page.evaluate(() => {
//       return document.body.querySelector('video').getAttribute('src');
//     });
//     await page.close();
//     await browser.close();
//     this.json({
//       code: 200,
//       html,
//       video,
//     });
//   }
//   async getListAction() {
//     this.json({
//       code: 200,
//     });
//   }
// };
