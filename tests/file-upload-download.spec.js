import { test, expect } from '@playwright/test';
const { UploadDownloadPage } = require('../page-objects/UploadDownloadPage');
const uploadDownloadPageTestData = require('../util/UploadDownloadPageTestData.json');

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
});

test('Validating file download and upload', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    const download = await uploadDownloadPage.clickDownload();
    const filePath = uploadDownloadPageTestData.file_path;

    // Temporary sandbox path
    const tempPath = await download.path();
    console.log(`File stored at: ${tempPath}`);

    // Persist it to your own folder
    await uploadDownloadPage.saveDownload(download, filePath);
    await uploadDownloadPage.uploadFile(filePath);
});