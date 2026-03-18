class applicationPage {
    constructor(page) {
        this.page = page;
        this.addApplication = this.page.locator('button:has-text("Add Application")');
    }

    async add_application() {
        await this.addApplication.click();
    }

    async add_application_with_details(jobTitle, companyName, jobLocation, salaryRange, jobUrl, notes) {
        await this.addApplication.click();
        await this.page.getByPlaceholder('Google').fill(companyName);
        await this.page.locator('input[name=position]').fill(jobTitle);
        await this.page.locator('input[name=location]').fill(jobLocation);
        await this.page.locator('input[name=salary_range]').fill(salaryRange);
        await this.page.locator('input[name=job_url]').fill(jobUrl);
        await this.page.locator('textarea[name=notes]').fill(notes);
        await this.page.locator('button[type="submit"]').click();

    }
    }

module.exports = { applicationPage };