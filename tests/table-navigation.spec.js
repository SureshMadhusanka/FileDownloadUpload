import { test, expect } from '@playwright/test';
const { WebTablesPage } = require('../page-objects/WebTablesPage');
const webTablesPageTestData = require('../util/WebTablesPageTestData.json');

let webTablesPage;

test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigateToWebTables();
});

test.describe.configure({ mode: 'serial' });
test(`@Smoke Validate Clicking Edit Button`, async ({ page }) => {    
    const number_of_rows = await webTablesPage.getNumberOfRows();
    await expect(number_of_rows).toBe(webTablesPageTestData.expected_number_of_rows);
    const alden = webTablesPageTestData.persons.find(p => p.name === "Alden");
    await expect(webTablesPage.tableRowWithText(alden.name)).toBeVisible();
    await webTablesPage.clickEditForRowWithText(alden.name);
});

test(`@Regression Validate Salary of Kierra`, async ({ page }) => {
    const kierra = webTablesPageTestData.persons.find(p => p.name === "Kierra");
    await expect(webTablesPage.tableRowWithText(kierra.name)).toBeVisible();
    await expect(webTablesPage.getColumnForRow(kierra.name, webTablesPageTestData.salary_column_number)).toHaveText(kierra.salary.toString());
});

for (const person of webTablesPageTestData.persons) {
    test(`
        @Regression Validate ${person.name}`, async ({ page }) => {
        await expect(webTablesPage.tableRowWithText(person.name)).toBeVisible();
        await expect(webTablesPage.getColumnForRow(person.name, webTablesPageTestData.salary_column_number)).toHaveText(person.salary.toString());
        await expect(webTablesPage.getColumnForRow(person.name, webTablesPageTestData.last_name_column_number)).toHaveText(person.last_name);
        await expect(webTablesPage.getColumnForRow(person.name, webTablesPageTestData.age_column_number)).toHaveText(person.age.toString());
        await expect(webTablesPage.getColumnForRow(person.name, webTablesPageTestData.email_column_number)).toHaveText(person.email);
        await expect(webTablesPage.getColumnForRow(person.name, webTablesPageTestData.department_column_number)).toHaveText(person.department);
    });
}