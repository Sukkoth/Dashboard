const baseURL = import.meta.env.VITE_BACKEND_URL;
import useApiFetch from '../API/useApiFetch';
import { useNavigate, useParams } from 'react-router-dom';
import FullLoader from '../Components/Loaders/FullLoader';
import AlertError from '../Components/ListContracts/Alerts/LargeAlert';
import { useContext, useState } from 'react';
import { DataContext } from '../Providers/DataProvider';
import numeral from 'numeral';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { calculateDaysLeft } from '../utils/calculateDaysLeft';

const ShowContract = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const { findBranchInfo } = useContext(DataContext);

  const {
    data: contract,
    isLoading,
    errors,
  } = useApiFetch({
    url: `/leases/${contractId}`,
    method: 'GET',
  });

  const branchInfo = findBranchInfo(contract?.branchId);

  let installmentDetails = null;
  if (contract?.installmentDetails) {
    installmentDetails = JSON.parse(contract?.installmentDetails);
  }
  return (
    <>
      <FullLoader isLoading={isLoading} />
      {errors?.message ? (
        <AlertError message={errors?.message} />
      ) : (
        <div className='container-fluid pt-4 px-4 take-screen'>
          <div className='row g-4 align-items-stretch details'>
            <div className='col-sm-6'>
              <div className='trans p-4 '>
                <h3 className='h4 fw-bold mb-3'>Basic Information</h3>
                <div className='ms-3'>
                  <p className='mb-2'>
                    ID :{' '}
                    <span style={{ fontWeight: 'normal' }}>{contract?.id}</span>
                  </p>
                  <p className='mb-2'>
                    Branch Name :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {contract?.branchName}
                    </span>
                  </p>
                  <p className='mb-2'>
                    District Name :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {branchInfo?.district}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Region Name :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {branchInfo?.region}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Contract Type:{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {contract?.contractType}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Status:{' '}
                    <span
                      style={{
                        fontWeight: 'normal',
                        color: contract?.authorization ? '' : 'red',
                      }}
                    >
                      {contract?.authorization ? 'Authorized' : 'Unauthorized'}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Registration Date :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {contract?.contractRegisteredDate}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Start Date :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {contract?.contractStartDate}
                    </span>
                  </p>
                  <p className='mb-2'>
                    End Date :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {contract?.contractEndDate}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Expiry Status:
                    <span
                      style={{
                        fontWeight: 'normal',
                        color:
                          calculateDaysLeft(contract?.contractEndDate) < 0
                            ? 'red'
                            : 'black',
                      }}
                    >
                      {calculateDaysLeft(contract?.contractEndDate) < 0
                        ? `Expired ${calculateDaysLeft(
                            Math.abs(
                              calculateDaysLeft(contract?.contractEndDate)
                            )
                          )} days ago`
                        : `Will expire after ${calculateDaysLeft(
                            contract?.contractEndDate
                          )} days`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className='col-sm-6 '>
              <div className='trans p-4 '>
                <h3 className='h4 fw-bold mb-3'>Financial Information</h3>
                <div className='ms-3'>
                  <p className='mb-2'>
                    Advance Payment :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {numeral(contract?.advancePayment).format('0,0.00')}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Initial Direct Cost :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {numeral(contract?.initialDirectCost).format('0,0.00')}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Discount Rate :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {numeral(contract?.discountRate).format('0,0.00')}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Lease Incentive :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {numeral(contract?.leaseIncentive).format('0,0.00')}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Total Payment :{' '}
                    <span style={{ fontWeight: 'normal' }}>
                      {numeral(contract?.totalPayment).format('0,0.00')}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {installmentDetails && (
              <div className='col-sm-6 '>
                <div className='trans p-4 '>
                  <h3 className='h4 fw-bold mb-3'>Installement Details</h3>
                  <div className='ms-3'>
                    {Object.keys(installmentDetails).map((key) => (
                      <p className='mb-2' key={key}>
                        {key} :{' '}
                        <span
                          style={{
                            fontWeight: 'normal',
                          }}
                        >
                          {numeral(installmentDetails[key]).format('0,0.00')}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className='col-sm-8'>
              <div className='trans p-4'>
                {contract?.fileName && (
                  <>
                    <h3 className='h4 fw-bold'>Contract File</h3>
                    <ViewFile fileName={contract?.fileName} />{' '}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='d-flex gap-3'>
            <button
              className='btn btn-primary  mt-5'
              onClick={() => navigate(`/leases/${contractId}/update`)}
            >
              Update
            </button>
            <button
              className='btn btn-primary  mt-5'
              onClick={() => navigate(`/report/${contractId}/`)}
            >
              View Report
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function ViewFile({ fileName }) {
  const [error, setError] = useState('');
  const pdfUrl = `${baseURL}/leases/file/${fileName}`;

  if (error) {
    return <div className='text-danger'>{error}</div>;
  }

  return (
    <>
      {!error && (
        <p
          style={{
            fontStyle: 'italic',
            fontWeight: '500',
            marginBottom: '3rem',
          }}
        >
          click{' '}
          <a
            href={`${baseURL}/leases/file/${fileName}`}
            target='_blank'
            rel='noreferrer'
          >
            here
          </a>{' '}
          to download file
        </p>
      )}

      <div className='mx-auto overflow-scroll' style={{ maxHeight: '100vh' }}>
        <Worker workerUrl={'/asset/pdf.worker.min.js'}>
          <Viewer
            fileUrl={pdfUrl}
            renderError={(error) =>
              setError(error?.message || 'File could not be rendered')
            }
          />
        </Worker>
      </div>
    </>
  );
}

export default ShowContract;
