import { Locator, Page } from "@playwright/test";

/* Function will automatically check if the file has been sent */
export async function uploadFile(
  uploadIniciator: Locator,
  pathToFile: string,
  page: Page
) {
  const uploadPromise = page.waitForEvent("filechooser");
  await uploadIniciator.click();

  const file = await uploadPromise;
  await file.setFiles(pathToFile);
}
