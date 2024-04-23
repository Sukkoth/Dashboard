import { Suspense } from 'react';
import SuspenseFallback from './SuspenseFallback';
import FullLoader from './Loaders/FullLoader';

//if main home is true, you need fullscreen suspense fallback
//else just use the loader you are using to show data loading
export default function WithSuspense(Component, options = { mainHome: false }) {
  // eslint-disable-next-line react/display-name
  return () => (
    <Suspense
      fallback={
        options.mainHome ? (
          <SuspenseFallback />
        ) : (
          <FullLoader isLoading={true} />
        )
      }
    >
      <Component />
    </Suspense>
  );
}
