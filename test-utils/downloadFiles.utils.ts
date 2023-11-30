import { Locator, Page } from "@playwright/test";
import fs from "fs";

/* Function will remove test-download folder with files inside.*/
export function clearDownloadFolder() {
  return new Promise((resolve, reject) => {
    fs.rm("test-download/", { recursive: true }, (err) => {
      resolve(null);
      reject(err);
    });
  });
}

/* Function will automatically check if the file has downloaded at a given time */
export async function downloadFile(
  downloadIniciator: Locator,
  maximumDownloadTime: number,
  page: Page
) {
  const downloadPromise = page.waitForEvent("download", {
    timeout: maximumDownloadTime,
  });
  await downloadIniciator.click();

  const download = await downloadPromise;
  await download.saveAs(`test-download/${download.suggestedFilename()}`);
}
