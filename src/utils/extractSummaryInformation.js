function extractSummaryData(summaryData) {
  const mainData = {
    report: {},
    ammortization: {},
  };

  const years = [];

  summaryData?.forEach((data) => {
    data?.summaryArray?.forEach((summary) => {
      if (summary.year === '-') return;
      if (summary?.deprecationExp !== undefined) {
        if (!mainData.report[summary.year]) {
          mainData.report[summary.year] = [];
        }
        mainData.report[summary.year].push({
          ...summary,
          branchName: data?.detail?.[0]?.branchName,
        });
      } else if (summary?.interestExpence !== undefined) {
        if (!mainData.ammortization[summary.year]) {
          mainData.ammortization[summary.year] = [];
        }
        mainData.ammortization[summary.year].push({
          ...summary,
          branchName: data?.detail?.[0]?.branchName,
        });
      }
      if (!years.includes(summary.year)) years.push(summary.year);
    });
  });

  const extractedData = {};

  years.forEach((year) => {
    let data = {
      rou: 0,
      leaseLiability: 0,
      deprecationExp: 0,
      financeCharge: 0,
      payment: 0,
    };

    data['rou'] =
      mainData.report[year]?.reduce((acc, data) => {
        return acc + (data.balance === '-' ? 0 : data.balance || 0);
      }, 0) || 0;

    data['leaseLiability'] =
      mainData.ammortization[year]?.reduce((acc, data) => {
        return acc + (data.balance === '-' ? 0 : data.balance || 0);
      }, 0) || 0;

    data['deprecationExp'] =
      mainData.report[year]?.reduce((acc, data) => {
        return (
          acc + (data.deprecationExp === '-' ? 0 : data.deprecationExp || 0)
        );
      }, 0) || 0;

    data['financeCharge'] =
      mainData.ammortization[year]?.reduce((acc, data) => {
        return (
          acc + (data.interestExpence === '-' ? 0 : data.interestExpence || 0)
        );
      }, 0) || 0;

    data['payment'] =
      mainData.ammortization[year]?.reduce((acc, data) => {
        return acc + (data.leasePayment === '-' ? 0 : data.leasePayment || 0);
      }, 0) || 0;

    extractedData[year] = data;
  });
  return { mainData, years, extractedData };
}

export default extractSummaryData;
