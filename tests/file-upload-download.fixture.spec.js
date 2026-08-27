const { testBase } = require('../util/TestBase.js')
const { expect } = require('@playwright/test');
const { UploadDownloadPage } = require('../page-objects/UploadDownloadPage');

testBase.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
});

testBase('Validating file download and upload', async ({ page, uploadDownloadPageTestData }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    const download = await uploadDownloadPage.clickDownload();
    const filePath = uploadDownloadPageTestData.file_path;

    // Temporary sandbox path
    const tempPath = await download.saveAs();
    console.log(`File stored at: ${tempPath}`);
    console.log(`File path at: ${filePath}`);

    // Persist it to your own folder
    await uploadDownloadPage.saveDownload(download, filePath);
    await uploadDownloadPage.uploadFile(filePath);
});