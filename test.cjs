const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/login');
  
  console.log('Page loaded. Checking inputs...');
  
  // Wait for inputs
  await page.waitForSelector('input[placeholder="Usuário"]');
  
  // Focus the first input
  await page.focus('input[placeholder="Usuário"]');
  
  // Type username
  await page.keyboard.type('testuser');
  
  // Tab to password
  await page.keyboard.press('Tab');
  
  // Type password
  await page.keyboard.type('testpass');
  
  // Tab to eye icon
  await page.keyboard.press('Tab');
  
  // Press enter on eye icon
  await page.keyboard.press('Enter');
  
  // Check if input type changed to text
  let inputType = await page.$eval('input[placeholder="Senha"]', el => el.type);
  console.log('After first Enter on eye, password input type is:', inputType);
  
  // Press enter again
  await page.keyboard.press('Enter');
  inputType = await page.$eval('input[placeholder="Senha"]', el => el.type);
  console.log('After second Enter on eye, password input type is:', inputType);

  // Tab to login button
  await page.keyboard.press('Tab');
  
  // Press enter on login button
  await page.keyboard.press('Enter');
  console.log('Pressed enter on login button.');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Check if toast appears
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Body text after login:', bodyText.includes('Erro') ? 'Error visible' : 'No error');
  
  await browser.close();
})();
