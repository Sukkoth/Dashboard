import { useState } from 'react';
import SelectionForm from '../Components/Upload/Form';
import DisplayTable from '../Components/Upload/UploadData';

const AnotherReport = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [showReport, setShowReport] = useState(false);

  const propsToPassToGenerateReport = {
    selectedYear,
    selectedMonth,
    setSelectedYear,
    setSelectedMonth,
    setShowReport,
  };

  const propsToPassToReport = {
    selectedYear,
    selectedMonth,
    setShowReport,
  };

  return showReport === true ? (
    <DisplayTable {...propsToPassToReport} />
  ) : (
    <SelectionForm {...propsToPassToGenerateReport} />
  );
};

export default AnotherReport;
