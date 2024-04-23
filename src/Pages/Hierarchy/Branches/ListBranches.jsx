import useApiFetch from '../../../API/useApiFetch';
import FullLoader from '../../../Components/Loaders/FullLoader';
import LargeAlert from '../../../Components/ListContracts/Alerts/LargeAlert';
import ListComponent from '../../../Components/Hierarchy/Branches/ListBranches';
import { useEffect, useState } from 'react';
import Modal from '../../../Components/Modal';
import { useSearchParams } from 'react-router-dom';

const ListBranches = () => {
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: branchData,
    isLoading,
    errors,
    fetchData,
  } = useApiFetch(
    {
      url: '/branch/getAllBranches',
      method: 'get',
    },
    false
  );

  useEffect(() => {
    let params = {
      sortBy: searchParams.get('sortBy') || 'branchName',
      sortOrder: searchParams.get('sortOrder') || 'asc',
      size: searchParams.get('size') || 25,
      page: searchParams.get('page') || 1,
      districtId: searchParams.get('districtId') || null,
    };
    params = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== null)
    );

    setSearchParams(params);
    fetchData({ params });
  }, []);

  const {
    isLoading: isDeleting,
    errors: deleteError,
    fetchData: deleteBranch,
    setErrors: setDeleteErrors,
    data: deleteBranchData,
  } = useApiFetch(
    {
      method: 'delete',
    },
    false
  );

  function handleDelete() {
    if (branchToDelete) {
      deleteBranch({
        url: `/branch/deleteBranch/${branchToDelete}`,
      });
    }
  }

  useEffect(() => {
    //it means that server has responded successfully
    if (deleteBranchData !== null) {
      location.reload();
    }
  }, [deleteBranchData]);

  return (
    <>
      <FullLoader isLoading={isLoading} />
      {!isLoading && !errors?.message && (
        <>
          {setBranchToDelete && (
            <Modal
              displayQuestion='Are you sure to delete the selected branch?'
              onConfrim={() => handleDelete()}
              isLoading={isDeleting}
              message={deleteError?.message ? 'Could not delete branch' : null}
              onClose={() => {
                setDeleteErrors({});
                setBranchToDelete(null);
              }}
            />
          )}
          <div className='container-fluid take-screen p-3 pb-3'>
            <ListComponent
              branchData={branchData}
              fetchData={fetchData}
              setTobeDeleted={setBranchToDelete}
            />
          </div>
        </>
      )}
      <LargeAlert isLoading={isLoading} message={errors?.message} />
    </>
  );
};

export default ListBranches;
