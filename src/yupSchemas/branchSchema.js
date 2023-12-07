import * as yup from 'yup';

const branchSchema = yup.object().shape({
    branchName: yup.string().required('Branch Name is required'),
    branchCode: yup.string().required('Branch Code is required'),
    location: yup
        .number()
        .required('Location is required')
        .typeError('Location is required and must be a number'),
    costCenter: yup
        .number()
        .typeError('Cost Center is required')
        .required('Cost Center is required and must be a number'),
    district: yup
        .string()
        .typeError('District is required and must be a number')
        .required('District is required'),
    region: yup
        .string()
        .typeError('Region is required and must be a number')
        .required('Region  is required'),
    // politicalRegion: yup.object().shape({
    //     // Define the schema for the PoliticalRegion if it's an object
    //     // For example:
    //     regionName: yup.string().required('Political Region Name is required'),
    //     // Add more properties as needed
    // }),
});

export default branchSchema;
