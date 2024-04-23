import React from 'react';
import WithSuspense from '../Components/WithSuspense';

export const Dashboard = WithSuspense(
  React.lazy(() => import('../Dashboard')),
  { mainHome: true }
);
export const HOME = WithSuspense(React.lazy(() => import('./Home')));
//CONTRACTS

const ListContracts = WithSuspense(
  React.lazy(() => import('./ContractsList/ListContracts'))
);
const ShowContract = WithSuspense(React.lazy(() => import('./ShowContract')));
const SingleContractReport = WithSuspense(
  React.lazy(() => import('./SingleContractReport'))
);
const ExpiredContracts = WithSuspense(
  React.lazy(() => import('./ContractsList/EndedContracts'))
);
const ListActiveContracts = WithSuspense(
  React.lazy(() => import('./ContractsList/ListActiveContracts'))
);
const AddContract = WithSuspense(React.lazy(() => import('./AddContract')));
const UpdateContract = WithSuspense(
  React.lazy(() => import('./UpdateContract'))
);
const Search = WithSuspense(React.lazy(() => import('./ContractsList/Search')));
const ExportForUpload = WithSuspense(
  React.lazy(() => import('./ExportForUpload'))
);

export const CONTRACTS = {
  LIST: ListContracts,
  SHOW: ShowContract,
  REPORT: SingleContractReport,
  EXPIRED: ExpiredContracts,
  ACTIVE: ListActiveContracts,
  ADD: AddContract,
  UPDATE: UpdateContract,
  SEARCH: Search,
  UPLOAD: ExportForUpload,
};

//Hierarchy
const ListBranches = WithSuspense(
  React.lazy(() => import('./Hierarchy/Branches/ListBranches'))
);
const ListDistricts = WithSuspense(
  React.lazy(() => import('./Hierarchy/District/ListDistricts'))
);
const ListRegions = WithSuspense(
  React.lazy(() => import('./Hierarchy/Regions/ListRegions'))
);
const UpdateRegion = WithSuspense(
  React.lazy(() => import('./Hierarchy/Regions/UpdateRegion'))
);
const UpdateDistrict = WithSuspense(
  React.lazy(() => import('./Hierarchy/District/UpdateDistrict'))
);
const UpdateBranch = WithSuspense(
  React.lazy(() => import('./Hierarchy/Branches/UpdateBranch'))
);
const DistrictSummary = WithSuspense(
  React.lazy(() => import('./Hierarchy/District/Summary/DistrictSummary'))
);
const AddHierarchy = WithSuspense(React.lazy(() => import('./Hierarchy/Add')));

export const HIERARCHY = {
  ADD: AddHierarchy,
  BRANCHES: ListBranches,
  DISTRICTS: ListDistricts,
  REGIONS: ListRegions,
  UPDATE_BRANCH: UpdateBranch,
  UPDATE_DISTRICT: UpdateDistrict,
  UPDATE_REGION: UpdateRegion,
  DISTRICT_SUMMARY: DistrictSummary,
};
