const { chromium } = require('@playwright/test');
const LoginPage = require('../../pages/jobcompass/JobCompassLoginPage');
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('🔐 Setting up authenticated session for smoke tests...');
    
    const loginPage = new LoginPage(page);
    await loginPage.goto(testData[0].url); // https://job-seeker-buddy-40.lovable.app/auth
    await loginPage.login(testData[0].email, testData[0].password);
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Save session for smoke tests
    await page.context().storageState({ path: '.auth/smoketest.json' });
    
    console.log('✅ Smoke test session created: .auth/smoketest.json');
  } catch (error) {
    console.error('❌ Failed to create smoke test session:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
};
