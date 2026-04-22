const {test, expect} = require('@playwright/test');
const ApplicationPage = require('../../pages/jobcompass/JobCompassApplicationPage');
const testData = JSON.parse(JSON.stringify(require('../../data/jobcompass_testdata.json')));

test.describe('Add Application', () => {
    test('Add Application Test', async ({ page }) => {
        // No login needed - already authenticated
        const applicationPage = new ApplicationPage(page);

        await page.goto('https://job-seeker-buddy-40.lovable.app');
        await applicationPage.addApplication();
        await expect(page).toHaveURL('https://job-seeker-buddy-40.lovable.app/add');
        await expect(page.getByText(testData[0].newapplicationlabel)).toBeVisible();
        await expect(page.getByText(testData[0].newapplicationlabel)).toHaveText(testData[0].newapplicationlabel);
    });

    test('Application Details and Count Test', async ({ page }) => {
        // No login needed - already authenticated
        const applicationPage = new ApplicationPage(page);

        await page.goto('https://job-seeker-buddy-40.lovable.app');
        const initialCount = parseInt(await page.locator('p:near(:text("Total Applications"))').textContent());
        console.log('Initial application count:', initialCount);
        const title = testData[1].jobTitle + '-' + generateRandomNumber();
        await applicationPage.addApplicationWithDetails(title, testData[1].companyName, testData[1].jobLocation, testData[1].salaryRange, testData[1].jobUrl, testData[1].notes);
        await expect(page.getByText(title).first()).toBeVisible();
        await expect(page.getByText(testData[1].companyName).first()).toBeVisible();
        await page.locator('button:has-text("Dashboard")').click();
        await page.reload();
        const finalCount = parseInt(await page.locator('p:near(:text("Total Applications"))').textContent());
        console.log('Final application count:', finalCount);
        await expect(finalCount).toBe(initialCount+1);
        
    });
});

function generateRandomNumber() {
    return Math.floor(Math.random() * 100000);
}
