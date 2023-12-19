import * as yup from 'yup';

const contractSchema = yup.object().shape({
    branchName: yup.string().required('Branch is required'),
    contractType: yup.string().required('Contract Type is required'),
    district: yup.string().required('District is required'),
    region: yup.string().required('Region is required'),
    fileName: yup
        .string()
        .required(
            'File is required, upload it before submitting the whole information'
        ),
    advancePayment: yup
        .number()
        .required('Advance Payment is required')
        .typeError('Advance Payment is required')
        .min(1, 'Advance Payment must be greater than 0'),
    discountRate: yup
        .number()
        .typeError('Discount rate must be a number')
        .min(0.0000001, 'Discount rate must be greater than 0'),
    initialDirect_cost: yup
        .number('Initial direct cost must be number, put 0 if none')
        .nullable()
        .typeError('Initial direct cost must be number, put 0 if none')
        .default(0),
    leaseIncentive: yup
        .number('Lease Incentive direct cost must be number, put 0 if none')
        .nullable()
        .typeError('Lease Incentive cost must be number, put 0 if none')
        .default(0),
    totalPayment: yup
        .number('Value must be a number')
        .required('Total Payment is required')
        .typeError('Total Payment is required'),
    contractRegisteredDate: yup
        .string()
        .required('Contract registration date required')
        .length(10),
    contractStartDate: yup
        .string()
        .required('Contract start date required')
        .length(10),
    contractEndDate: yup
        .string()
        .required('Contract end date required')
        .length(10),
    contractReason: yup.string().required('Contract reason required'),
});

export default contractSchema;
