import LargeAlert from '../Components/ListContracts/Alerts/LargeAlert';

function NotFound() {
  return (
    <div className='container-fluid take-screen'>
      <div className='col-12'>
        <LargeAlert message={'404 NOT FOUND'} />
      </div>
    </div>
  );
}

export default NotFound;
