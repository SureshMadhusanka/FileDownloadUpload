class UploadDownloadPage {
    constructor(page) {
        this.page = page;
        this.downloadButton = page.getByRole('button', { name: 'Download' });
        this.uploadButton = page.locator('#uploadFile');
    }

    async clickDownload() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadButton.click()
        ]);
        return download;
    }

    async saveDownload(download, savePath) {
        await download.saveAs(savePath);
    }

    async uploadFile(filePath) {
        await this.uploadButton.setInputFiles(filePath);
    }
}

module.exports = { UploadDownloadPage };