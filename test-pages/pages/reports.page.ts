import { BasePageLogged } from "../baseLogged.page.setup";
import { downloadFile } from "../../test-utils/downloadFiles.utils";
import { uploadFile } from "../../test-utils/uploadFiles.utils";
import { expect } from "@playwright/test";
import * as am from "../../test-utils/asserationMessages";

export type DownloadAnnualReportFileType = "txt" | "zip";
export type UploadAnnualReportFileType = "txt" | "json";

export class ReportsPage extends BasePageLogged {
  /* locators */

  protected readonly annualRaport = {
    download: {
      txt: this.page
        .locator("#widget_topup_1")
        .getByText("txt", { exact: false }),
      zip: this.page
        .locator("#widget_topup_1")
        .getByText("zip", { exact: false }),
    },
    upload: {
      txt: {
        iniciator: this.page.locator("#my_file_1"),
        sendFile: this.page.locator("#widget_topup_2").locator("#send_btn"),
        fileName: this.page.locator("#widget_topup_2 .filename"),
      },
      json: {
        iniciator: this.page.locator("#my_file_2"),
        sendFile: this.page.locator("#widget_topup_3").locator("#send_btn_2"),
        fileName: this.page.locator("#widget_topup_3 .filename"),
      },
    },
  };

  /* functions */
  async downloadAnnualReport(fileType: DownloadAnnualReportFileType) {
    await downloadFile(this.annualRaport.download[fileType], 5000, this.page);
  }

  async uploadAnnualReport(
    fileName: string,
    fileType: UploadAnnualReportFileType
  ) {
    await uploadFile(
      this.annualRaport.upload[fileType].iniciator,
      `test-data/reportsToSend/${fileName}.${fileType}`,
      this.page
    );

    await this.annualRaport.upload[fileType].sendFile.click();
  }
  /* asserations */

  async fileShuldBeUploated(
    fileName: string,
    fileType: UploadAnnualReportFileType
  ) {
    expect(
      await this.annualRaport.upload[fileType].fileName.innerText(),
      am.file.fileIsNotUploated
    ).toBe(`${fileName}.${fileType}`);
  }
}
