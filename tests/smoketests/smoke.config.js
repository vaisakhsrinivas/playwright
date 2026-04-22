const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  testMatch: '*.spec.js',
  fullyParallel: true,
  workers: 4,
  reporter: 'html',
  
  // Run setup before smoke tests
  globalSetup: require.resolve('./smoketest.setup.js'),
  
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    
    // Load shared session for all smoke tests
    storageState: '.auth/smoketest.json'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1080, height: 600 }
      }
    }
  ]
});
