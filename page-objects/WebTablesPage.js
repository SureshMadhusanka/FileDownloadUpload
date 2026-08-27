class WebTablesPage {
    constructor(page) {
        this.page = page;
        this.table = page.locator('table.-striped');
        this.table_rows = this.table.getByRole('row');
    }

    async navigateToWebTables() {
        await this.page.goto('https://demoqa.com/webtables');
    }

    tableRowWithText(text) {
        return this.table_rows.filter({ hasText: text });
    }

    async getNumberOfRows() {
        return await this.table_rows.count();
    }

    async clickEditForRowWithText(text) {
        await this.table_rows.filter({ hasText: text }).getByTitle('Edit').click();
    }

    getColumnForRow(text, cellIndex) {
        return this.table_rows.filter({ hasText: text }).locator('td').nth(cellIndex);
    }
}

module.exports = { WebTablesPage }