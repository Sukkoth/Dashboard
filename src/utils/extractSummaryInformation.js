function extractSummaryInformation(summaryData) {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation, such as fetching data
    const years = [];
    const extractedSummaryData = {
      report: {},
      ammortization: {},
    };

    try {
      summaryData?.forEach((data) => {
        data?.summaryArray?.forEach((summary) => {
          if (summary.year === '-') return;
          if (summary?.deprecationExp !== undefined) {
            if (!extractedSummaryData.report[summary.year]) {
              extractedSummaryData.report[summary.year] = [];
            }
            extractedSummaryData.report[summary.year].push({
              ...summary,
              branchName: data?.detail?.[0]?.branchName,
            });
          } else if (summary?.interestExpence !== undefined) {
            if (!extractedSummaryData.ammortization[summary.year]) {
              extractedSummaryData.ammortization[summary.year] = [];
            }
            extractedSummaryData.ammortization[summary.year].push({
              ...summary,
              branchName: data?.detail?.[0]?.branchName,
            });
          }
          if (!years.includes(summary.year)) years.push(summary.year);
        });
      });
      resolve({ years, extractedSummaryData });
    } catch (error) {
      reject({ message: error.message });
    }
  });
}

export default extractSummaryInformation;
