import useApiFetch from '../../../API/useApiFetch';
import FullLoader from '../../../Components/Loaders/FullLoader';
import LargeAlert from '../../../Components/ListContracts/Alerts/LargeAlert';
import ListComponent from '../../../Components/Hierarchy/Districts/ListDistricts';
import { useEffect, useState } from 'react';
import Modal from '../../../Components/Modal';

const ListDistricts = () => {
  const [districtToDelete, setDistrictToDelete] = useState(null);

  const {
    data: districtData,
    isLoading,
    errors,
    fetchData,
  } = useApiFetch({
    url: 'districts/getAllDistricts',
    method: 'get',
    params: {
      page: 1,
      size: 25,
    },
  });

  const {
    isLoading: isDeleting,
    errors: deleteError,
    fetchData: deleteDistrict,
    setErrors: setDeleteErrors,
    data: deleteDistrictData,
  } = useApiFetch(
    {
      method: 'delete',
    },
    false
  );

  function handleDelete() {
    if (districtToDelete) {
      deleteDistrict({
        url: `/districts/deleteDistrict/${districtToDelete}`,
      });
    }
  }

  useEffect(() => {
    //it means that server has responded successfully
    if (deleteDistrictData !== null) {
      location.reload();
    }
  }, [deleteDistrictData]);

  return (
    <>
      <FullLoader isLoading={isLoading} />
      {!isLoading && !errors?.message && (
        <>
          {setDistrictToDelete && (
            <Modal
              displayQuestion='Are you sure to delete the selected district?'
              onConfrim={() => handleDelete()}
              isLoading={isDeleting}
              message={
                deleteError?.message ? 'Could not delete district' : null
              }
              onClose={() => {
                setDeleteErrors({});
                setDistrictToDelete(null);
              }}
            />
          )}
          <div className='container-fluid take-screen p-3 pb-3'>
            <ListComponent
              districtData={districtData}
              fetchData={fetchData}
              setTobeDeleted={setDistrictToDelete}
            />
          </div>
        </>
      )}
      <LargeAlert isLoading={isLoading} message={errors?.message} />
    </>
  );
};

export default ListDistricts;
