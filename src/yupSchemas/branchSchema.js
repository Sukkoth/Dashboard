import * as yup from 'yup';

const branchSchema = yup.object().shape({
    branchName: yup.string().required('Branch Name is required'),
    branchCode: yup.string().required('Branch Code is required'),
    location: yup
        .string()
        .required('Location is required')
        .typeError('Location is required'),
    costCenter: yup
        .string()
        .typeError('Cost Center is required')
        .required('Cost Center is required'),
    claimAccount: yup
        .string()
        .typeError('Claim Account is required')
        .required('Claim Account is required'),
    district: yup
        .string()
        .typeError('District is required')
        .required('District is required'),
    region: yup
        .string()
        .typeError('Region is required')
        .required('Region  is required'),
    // politicalRegion: yup.object().shape({
    //     // Define the schema for the PoliticalRegion if it's an object
    //     // For example:
    //     regionName: yup.string().required('Political Region Name is required'),
    //     // Add more properties as needed
    // }),
});

export default branchSchema;
