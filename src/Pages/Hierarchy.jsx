import AddBranch from '../Components/Hierarchy/AddBranch';
import AddDistrict from '../Components/Hierarchy/AddDistrict';

function Hierarchy() {
    return (
        <div className='container-fluid pt-4 px-4 take-screen row'>
            <AddBranch />
            <AddDistrict />
        </div>
    );
}

export default Hierarchy;
