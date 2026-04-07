class JobCompassApplicationPage {
    constructor(page) {
        this.page = page;
        this.jobCompassAddApplication = this.page.locator('button:has-text("Add Application")');
    }

    async addApplication() {
        await this.jobCompassAddApplication.click();
    }

    async addApplicationWithDetails(jobTitle, companyName, jobLocation, salaryRange, jobUrl, notes) {
        await this.jobCompassAddApplication.click();
        await this.page.getByPlaceholder('Google').fill(companyName);
        await this.page.locator('input[name=position]').fill(jobTitle);
        await this.page.locator('input[name=location]').fill(jobLocation);
        await this.page.locator('input[name=salary_range]').fill(salaryRange);
        await this.page.locator('input[name=job_url]').fill(jobUrl);
        await this.page.locator('textarea[name=notes]').fill(notes);
        await this.page.locator('button[type="submit"]').click();
        await this.page.getByPlaceholder('Search company or position').fill(jobTitle);

    }
    }

module.exports = JobCompassApplicationPage;