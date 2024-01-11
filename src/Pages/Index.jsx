import { Link, useNavigate } from 'react-router-dom';
import useApiFetch from '../API/useApiFetch';
import { useContext } from 'react';
import { DataContext } from '../Providers/DataProvider';

const Index = () => {
  const navigate = useNavigate();
  const { data, isLoading, errors } = useApiFetch({
    url: '/leases/static',
    method: 'GET',
  });

  const { regionsData } = useContext(DataContext);
  const totalDistricts = regionsData?.reduce((acc, curr) => {
    return acc + curr.districts.length;
  }, 0);

  const totalBranches = regionsData?.reduce((acc, curr) => {
    return (
      acc +
      curr.districts.reduce((acc, dist) => {
        return acc + dist.branches.length;
      }, 0)
    );
  }, 0);

  return (
    <div className='take-screen' style={{ backgroundColor: '#f2f7ff' }}>
      <div className='container-fluid pt-4 px-4'>
        <div className='row g-4'>
          <div className='col-sm-6 col-xl-3 '>
            <div
              className='trans  d-flex align-items-center justify-content-between p-4 hover-up '
              onClick={() => navigate('/list-contracts/all')}
            >
              <i className='fa fa fa-chart-pie fa-3x icon-pink'></i>
              <div className='ms-3'>
                <p className='mb-2'>Total Contracts</p>
                <h6 className='mb-0'>{data?.totalContracts}</h6>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-xl-3'>
            <div
              className='trans d-flex align-items-center justify-content-between p-4 hover-up'
              onClick={() => navigate('/list-contracts/active')}
            >
              <i className='fab fa-creative-commons-sampling fa-3x icon-pink'></i>
              <div className='ms-3'>
                <p className='mb-2'>Active Contracts</p>
                <h6 className='mb-0'>{data?.activeContracts}</h6>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-xl-3'>
            <div
              className='trans d-flex align-items-center justify-content-between p-4 hover-up'
              onClick={() => navigate('/list-contracts/ended')}
            >
              <i className='fas fa-stopwatch fa-3x icon-pink'></i>
              <div className='ms-3'>
                <p className='mb-2'>Expired Contracts</p>
                <h6 className='mb-0'>{data?.expiredContracts}</h6>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-xl-3'>
            <div
              className='trans d-flex align-items-center justify-content-between p-4 hover-up'
              onClick={() => navigate('/hierarchy/regions')}
            >
              <i className='fas fa-globe fa-3x icon-pink'></i>
              <div className='ms-3'>
                <p className='mb-2'>Total Regions</p>
                <h6 className='mb-0'>{regionsData?.length}</h6>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-xl-3'>
            <div
              className='trans d-flex align-items-center justify-content-between p-4 hover-up'
              onClick={() => navigate('/hierarchy/districts')}
            >
              <i className='fas fa-briefcase fa-3x icon-pink'></i>
              <div className='ms-3'>
                <p className='mb-2'>Total Districts</p>
                <h6 className='mb-0'>{totalDistricts}</h6>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-xl-3'>
            <div
              className='trans d-flex align-items-center justify-content-between p-4 hover-up'
              onClick={() => navigate('/hierarchy/branches')}
            >
              <i className='fas fa-university fa-3x icon-pink'></i>
              <div className='ms-3'>
                <p className='mb-2'>Total Branches</p>
                <h6 className='mb-0'>{totalBranches}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Sale & Revenue End --> */}

      {/* <!-- Sales Chart Start --> */}
      <div className='container-fluid pt-4 px-4'>
        <div className='row g-4'>
          <div className='col-sm-12 col-xl-6'>
            <div className='trans items-center  p-4'>
              <div className='d-flex align-items-center justify-content-between mb-4 '>
                <h6 className='mb-0'>Active Contracts</h6>
                <Link
                  className='text-pink'
                  to='/list-contracts/active'
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  Show All
                </Link>
              </div>
              <canvas id='worldwide-sales'></canvas>
            </div>
          </div>
          <div className='col-sm-12 col-xl-6'>
            <div className='trans items-center  p-4'>
              <div className='d-flex align-items-center justify-content-between mb-4'>
                <h6 className='mb-0'>Expired Contracts</h6>
                <Link
                  to='/list-contracts/ended'
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  Show All
                </Link>
              </div>
              <canvas id='salse-revenue'></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
