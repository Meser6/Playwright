import { BasePageLogged } from "../baseLogged.page.setup";
import { downloadFile } from "../../test-utils/downloadFiles.utils";
export type AnnualReportFileType = "txt" | "zip";

export class ReportsPage extends BasePageLogged {
  /* locators */

  readonly annualRaport = {
    downloadButtons: {
      txt: this.page
        .locator("#widget_topup_1")
        .getByText("txt", { exact: false }),
      zip: this.page
        .locator("#widget_topup_1")
        .getByText("zip", { exact: false }),
    },
  };

  /* functions */
  async downloadAnnualReport(fileType: AnnualReportFileType) {
    await downloadFile(
      this.annualRaport.downloadButtons[fileType],
      5000,
      this.page
    );
  }
}
