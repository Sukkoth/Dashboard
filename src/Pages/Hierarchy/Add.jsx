import AddBranch from '../../Components/Hierarchy/Branches/AddBranch';
import AddDistrict from '../../Components/Hierarchy/Districts/AddDistrict';
import AddRegion from '../../Components/Hierarchy/Regions/AddRegion';

function Add() {
  return (
    <div className='container-fluid pt-4 px-4 take-screen row'>
      <AddBranch />
      <AddDistrict />
      <AddRegion />
    </div>
  );
}

export default Add;
