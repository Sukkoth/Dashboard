import * as yup from 'yup';

const districtSchema = yup.object().shape({
    districtName: yup.string().required('District Name is required'),
    leaseLiabilityAccount: yup
        .string()
        .required('leaseLiablity Account is requied'),
    rouAccount: yup.string().required('ROU Account is requied'),
    region: yup.string().required('Region is required'),
});

export default districtSchema;
