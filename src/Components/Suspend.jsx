import React from 'react';
import SuspenseFallback from './SuspenseFallback';

function Suspend({ children }) {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>{children}</React.Suspense>
  );
}

export default Suspend;
