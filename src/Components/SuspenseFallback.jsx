import { BounceLoader } from 'react-spinners';

function SuspenseFallback() {
  return (
    <section
      style={{
        height: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage:
          'linear-gradient(to top, #f3e7e9 60%,#e3eeff 99%,#e3eeff 100%)',
      }}
    >
      <BounceLoader size={80} color='pink' />
      <h1
        className='h1 text-header icon-pink text-lg'
        style={{ fontWeight: '900', fontSize: '4rem', letterSpacing: '0.5rem' }}
      >
        CBELM
      </h1>
    </section>
  );
}

export default SuspenseFallback;
