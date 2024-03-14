import PropTypes from 'prop-types';

const monthsInYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let yearDropDownOptions = [];
for (let year = 1990; year <= Number(new Date().getFullYear()) + 10; year++) {
  yearDropDownOptions.push(year);
}

const GenerateForUpload = ({
  setShowReport,
  selectedRegistrationDate,
  setSelectedRegistrationDate,
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
}) => {
  return (
    <div
      className='container-fluid pt-4 px-4 take-screen'
      style={{ backgroundColor: '#f2f7ff' }}
    >
      <div className='row bg-white rounded mx-0 p-5 align-text-center justify-content-center'>
        <div className='bg-white rounded col-12 col-md-5 col-lg-3 '>
          <h2 style={{ fontSize: '17px' }}>
            <label htmlFor='year'>Registration Date</label>
            <input
              type='date'
              name='date'
              id='date'
              className='form-select mt-1'
              value={selectedRegistrationDate}
              onChange={(e) => setSelectedRegistrationDate(e.target.value)}
            />
          </h2>
        </div>
        <div className='bg-white rounded col-12 col-md-5 col-lg-3 '>
          <h2 style={{ fontSize: '17px' }}>
            <label htmlFor='year'>Select Year</label>
            <select
              name='year'
              id='year'
              className='form-select mt-1'
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearDropDownOptions.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </h2>
        </div>
        <div className='bg-white rounded col-12 col-md-5 col-lg-3 '>
          <h2 style={{ fontSize: '17px' }}>
            <label htmlFor='year'>Select Month</label>
            <select
              name='year'
              id='year'
              className='form-select mt-1'
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {monthsInYear.map((month, index) => (
                <option value={index + 1} key={index}>
                  {month}
                </option>
              ))}
            </select>
          </h2>
        </div>
        <div
          className='bg-white rounded d-flex justify-content-center mt-5'
          style={{ boxShadow: 'none' }}
        >
          <button
            className='btn btn-primary'
            onClick={() => setShowReport(true)}
          >
            GENERATE REPORT
          </button>
        </div>
      </div>
    </div>
  );
};

function CheckBoxForm({
  children,
  title,
  onSelectAll,
  disabledSelectAll,
  countTotal,
  countSelected,
}) {
  return (
    <div className='bg-ligh rounded col-2'>
      <h2 style={{ fontSize: '17px' }}>
        {title + ' ' + countTotal}{' '}
        <span style={{ fontSize: '12px', color: 'red' }}>{countSelected}</span>
      </h2>
      <SelectBox
        name={`Select All ${title}`}
        handleChange={onSelectAll}
        checked={countSelected > 0 && countSelected === countTotal}
        disabled={disabledSelectAll}
      />
      {children}
    </div>
  );
}

CheckBoxForm.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string,
  onSelectAll: PropTypes.func,
  disabledSelectAll: PropTypes.bool,
  countTotal: PropTypes.number,
  countSelected: PropTypes.number,
};

function SelectBox({ name, handleChange, checked = false, disabled = false }) {
  return (
    <div className='mb-2'>
      <input
        type='checkbox'
        name={name}
        id={name}
        className='mx-2'
        onChange={() => handleChange(name)}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

SelectBox.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

GenerateForUpload.propTypes = {
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number,
  setShowReport: PropTypes.func,
  setSelectedYear: PropTypes.func,
  setSelectedMonth: PropTypes.func,
  selectedRegistrationDate: PropTypes.string,
  setSelectedRegistrationDate: PropTypes.func,
};
export default GenerateForUpload;
