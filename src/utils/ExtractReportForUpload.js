export function ExtractReportForUpload(
  reports,
  selectedYear,
  selectedMonth,
  branches,
  type
) {
  /**
   * *Extracted reports array contains
   * * **** reports which have data (!undefined)
   * * **** Reports which have the same month and year as the user have selected
   * * **** Reports that have deprecation expense
   */

  let extractedReports = [];
  reports.forEach((report) => {
    //check if the report is pressent
    if (report?.combinedArray?.length) {
      //find reports which have the selected years and months
      const row = report?.combinedArray.find(
        (report) =>
          report.year.split('-')[0] === `${selectedYear}` &&
          report.year.split('-')[1] ===
            `${
              selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`
            }` &&
          (type === 'ammortization'
            ? report?.interestExpence > 0
            : report?.deprecationExp > 0)
      );

      //find the reports which have deprecationExpense,
      //If they do not have it, you do not need it in the list
      if (row?.deprecationExp) {
        const branch = branches.find(
          (branch) => branch.BranchId === report.detail[0].BranchId
        );

        extractedReports.push({
          ...row,
          branch,
          type: report?.detail?.[0].contractType,
          year: report?.year,
        });
      }
    }
  });

  extractedReports?.sort((a, b) =>
    a?.branch?.name?.toUpperCase() < b?.branch?.name?.toUpperCase() ? -1 : 1
  );

  return extractedReports;
}
