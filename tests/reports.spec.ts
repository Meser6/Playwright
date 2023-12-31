import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager.setup";
import { pages } from "../test-data/pages.data";
import {
  DownloadAnnualReportFileType,
  UploadAnnualReportFileType,
} from "../test-pages/pages/reports.page";
import { clearDownloadFolder } from "../test-utils/downloadFiles.utils";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.reports);
});

test.describe("Reports", () => {
  test.beforeAll(async () => {
    await clearDownloadFolder();
  });

  ["txt", "zip"].forEach((fileType) => {
    test(`Downloading annual report as ${fileType}`, async () => {
      await pm.reportsPage.downloadAnnualReport(
        fileType as DownloadAnnualReportFileType
      );

      // Checking if the file has downloaded is inside the function
    });
  });

  ["txt", "json"].forEach((fileType) => {
    test(`Uploading annual report as ${fileType}`, async () => {
      const fileName = "plik";
      const type = fileType as UploadAnnualReportFileType;

      await pm.reportsPage.uploadAnnualReport(fileName, type);

      await pm.reportsPage.fileShuldBeUploated(fileName, type);
    });
  });
});
