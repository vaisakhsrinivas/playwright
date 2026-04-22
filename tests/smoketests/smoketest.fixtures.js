const { test: base } = require('@playwright/test');

exports.test = base.extend({
  // Page comes pre-authenticated from storageState
  authenticatedPage: async ({ page }, use) => {
    // Optional: Navigate to dashboard to start from known state
    await page.goto('https://job-seeker-buddy-40.lovable.app'); // Correct dashboard URL
    
    await use(page);
    
    // Optional cleanup after each test
    // (Session remains intact for next test)
  }
});
