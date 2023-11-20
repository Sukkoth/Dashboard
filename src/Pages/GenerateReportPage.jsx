import { useState } from 'react';
import GenerateReport from '../Components/GenerateReport/GenerateReport';
import Report from '../Components/GenerateReport/Report';

const GenerateReportPage = () => {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [showReport, setShowReport] = useState(false);

    const propsToPassToGenerateReport = {
        selectedRegions,
        setSelectedRegions,
        selectedDistricts,
        setSelectedDistricts,
        selectedBranches,
        setSelectedBranches,
        selectedMonths,
        setSelectedMonths,
        selectedYear,
        setSelectedYear,
        setShowReport,
    };

    const propsToPassToReport = {
        selectedRegions,
        selectedDistricts,
        selectedBranches,
        selectedMonths,
        selectedYear,
        setShowReport,
    };

    return showReport === true ? (
        <Report {...propsToPassToReport} />
    ) : (
        <GenerateReport {...propsToPassToGenerateReport} />
    );
};
export default GenerateReportPage;
