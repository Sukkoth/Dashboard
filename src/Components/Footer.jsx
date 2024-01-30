const Footer = () => {
  return (
    <footer className='container-fluid pt-2 px-1 bg-white'>
      <div className=' rounded-top p-3'>
        <div className='row'>
          <div className='col-12 col-sm-6 text-center text-sm-start h6'>
            &copy;
            <a
              className='h6'
              href='https://www.combanketh.et/'
              target='_blank'
              rel='noreferrer'
            >
              Commercial Bank of Ethiopia
            </a>
            , All Right Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
