import * as yup from 'yup';

const districtSchema = yup.object().shape({
    districtName: yup.string().required('District Name is required'),
    region: yup.string().required('Region is required'),
});

export default districtSchema;
