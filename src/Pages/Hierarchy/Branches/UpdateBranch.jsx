import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import branchSchema from '../../../yupSchemas/branchSchema';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../Providers/DataProvider';
import useApiFetch from '../../../API/useApiFetch';
import Alert from '../../../Components/Hierarchy/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

function UpdateBranch() {
  const { branchId } = useParams();
  const navigate = useNavigate();

  const { regionsData } = useContext(DataContext);

  const {
    data: branchData,
    isLoading: fetchingBranch,
    errors: errorFetchingBranch,
  } = useApiFetch({ url: `/branch/${branchId}`, method: 'GET' });

  const {
    data: updatedBranchData,
    isLoading: updatingBranch,
    errors: backEndError,
    fetchData: addBranch,
  } = useApiFetch({ method: 'PUT' }, false);

  //track the selected region to filter out it's districts
  const [selectedIndex, setSelectedIndex] = useState({
    region: '',
    district: '',
  });

  //useForm init
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({ resolver: yupResolver(branchSchema) });

  //handle form submit
  const onSubmitHandler = async (data) => {
    delete data['region']; //backend will not need this
    data['district'] = {
      districtId: Number(data.district),
    };

    await addBranch({
      url: `/branch/updateBranch/${branchData?.branch?.branchId}`,
      data: data,
    });
  };

  //this effect sets default values for the form after fetching the data from api
  useEffect(() => {
    if (branchData?.branch?.branchId) {
      //put district here to update the form
      //do not add region in here
      resetForm({
        ...branchData?.branch,
        district: branchData?.branch?.district?.districtId,
      });
      //put the region in index to update the form
      //do not add district in here
      setSelectedIndex({
        region: branchData?.branch?.district.region.regionId,
        district: 0,
      });
    }
  }, [branchData, resetForm]);

  //redirect to branch list after it is updated
  useEffect(() => {
    if (!updatingBranch && updatedBranchData?.branchId) {
      setTimeout(() => {
        navigate('/hierarchy/branches');
      }, 1500);
    }
  }, [updatedBranchData, updatingBranch, navigate]);

  return (
    <div className='container-fluid pt-4 px-4 take-screen row'>
      <div className='col-sm-12 col-xl-4 '>
        <div className='bg-white rounded p-4 position-relative'>
          {(fetchingBranch || errorFetchingBranch?.message) && (
            <div className='update-loader'>
              {!errorFetchingBranch?.message ? (
                <ScaleLoader color='#d30fa9' />
              ) : (
                <Alert
                  type='danger'
                  message={errorFetchingBranch?.message || 'Error'}
                  action='redirect'
                  link='/hierarchy/districts'
                />
              )}
            </div>
          )}

          <h6 className='h4 mb-4'>Update Branch</h6>
          {updatedBranchData?.branchId && (
            <Alert message='Success! Branch has been added Updated' />
          )}
          {backEndError?.message && (
            <Alert message={backEndError?.message || 'Error updating branch'} />
          )}
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <label htmlFor='branchName'>Branch Name</label>
            <input
              id='branchName'
              name='branchName'
              className='form-control mt-2'
              {...register('branchName')}
            />

            {errors?.branchName && (
              <div className='form-text text-danger'>
                {errors?.branchName?.message}
              </div>
            )}

            <label htmlFor='branchCode' className='mt-3'>
              Branch Code
            </label>
            <input
              id='branchCode'
              name='branchCode'
              className='form-control mt-2'
              {...register('branchCode')}
            />

            {errors?.branchCode && (
              <div className='form-text text-danger'>
                {errors?.branchCode?.message}
              </div>
            )}
            <label htmlFor='claimAccount' className='mt-3'>
              Claim Account
            </label>
            <input
              id='claimAccount'
              name='claimAccount'
              className='form-control mt-2'
              {...register('claimAccount')}
            />

            {errors?.claimAccount && (
              <div className='form-text text-danger'>
                {errors?.claimAccount?.message}
              </div>
            )}
            <label htmlFor='location' className='mt-3'>
              Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              className='form-control mt-2'
              {...register('location')}
            />
            {errors?.location && (
              <div className='form-text text-danger'>
                {errors?.location?.message}
              </div>
            )}
            <label htmlFor='costCenter' className='mt-3'>
              Cost center
            </label>
            <input
              type='text'
              id='costCenter'
              name='costCenter'
              className='form-control mt-2'
              {...register('costCenter')}
            />
            {errors?.costCenter && (
              <div className='form-text text-danger'>
                {errors?.costCenter?.message}
              </div>
            )}

            {/* REGION */}

            <label htmlFor='region' className='mt-3'>
              Region Name
            </label>
            <select
              id='region'
              name='region'
              className='form-select mt-2'
              value={selectedIndex.region}
              {...register('region')}
              onChange={(e) =>
                setSelectedIndex({
                  region: Number(e.target.value),
                  district: 0,
                })
              }
            >
              <option value='' disabled>
                Select Region Name
              </option>
              {regionsData?.map((region, index) => (
                <option value={region.regionId} key={index}>
                  {region.region}
                </option>
              ))}
            </select>
            {errors?.regionId && (
              <div className='form-text text-danger '>
                {errors?.regionId?.message}
              </div>
            )}

            {/* DISTRICT */}
            <label htmlFor='districtName' className='mt-3'>
              District Name
            </label>
            <select
              disabled={selectedIndex.region === null}
              id='district'
              name='district'
              className='form-select mt-2'
              {...register('district')}
            >
              <option value='' disabled>
                Select District Name
              </option>
              {regionsData
                ?.find((region) => region.regionId === selectedIndex.region)
                ?.districts.sort((a, b) => a.name.localeCompare(b.name))
                .map((district, index) => (
                  <option value={district.districtId} key={index}>
                    {district.name}
                  </option>
                ))}
            </select>
            {errors?.districtId && (
              <div className='form-text text-danger'>
                {errors?.districtId?.message}
              </div>
            )}

            <div className='d-flex'>
              <button
                className='btn btn-primary mx-auto mt-4'
                disabled={updatingBranch}
              >
                {updatingBranch ? 'Updating. . .' : 'Updates Branch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBranch;
