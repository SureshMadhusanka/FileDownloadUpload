const { testBase } = require('../util/TestBase.js')
const { expect } = require('@playwright/test');
const { WebTablesPage } = require('../page-objects/WebTablesPage');

let webTablesPage;

testBase.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigateToWebTables();
});

testBase('Validate Clicking Edit Button', async ({ webTablesPageTestData }) => {    
    const number_of_rows = await webTablesPage.getNumberOfRows();
    await expect(number_of_rows).toBe(webTablesPageTestData.expected_number_of_rows);
    const alden = webTablesPageTestData.persons.find(p => p.name === "Alden");
    await expect(webTablesPage.tableRowWithText(alden.name)).toBeVisible();
    await webTablesPage.clickEditForRowWithText(alden.name);
});

testBase('Validate Salary of Kierra', async ({ webTablesPageTestData }) => {
    const kierra = webTablesPageTestData.persons.find(p => p.name === "Kierra");
    await expect(webTablesPage.tableRowWithText(kierra.name)).toBeVisible();
    await expect(webTablesPage.getColumnForRow(kierra.name, webTablesPageTestData.salary_column_number)).toHaveText(kierra.salary.toString());
});
