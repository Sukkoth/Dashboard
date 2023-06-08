import * as yup from 'yup';

const contractSchema = yup.object().shape({
    // email: yup.string().email().required(),
    // password: yup.string().min(8).max(32).required(),
    branch_name: yup.string().required('Branch name is required'),
    branch_code: yup
        .string()
        .required('Branch code is required')
        .min(4, 'Branch code must be 4 characters')
        .max(4, 'Branch code must be 4 characters'),
    advance_payment: yup
        .number()
        .required('Advance Payment is required')
        .typeError('Advance Payment is required')
        .min(1, 'Advance Payment must be greater than 0'),

    discount_rate: yup
        .number()
        .typeError('Advance Payment must be a number')
        .min(1, 'Advance Payment must be greater than 0'),
    initial_direct_cost: yup
        .number('Initial direct cost must be number, put 0 if none')
        .nullable()
        .typeError('Initial direct cost must be number, put 0 if none')
        .default(0),
    lease_incentive: yup
        .number('Lease Incentive direct cost must be number, put 0 if none')
        .nullable()
        .typeError('Lease Incentive cost must be number, put 0 if none')
        .default(0),
    total_payment: yup
        .number('Value must be a number')
        .required('Total Payment is required')
        .typeError('Total Payment is required'),
    contract_start_date: yup.string().required('Contract start date required'),
    contract_end_date: yup.string().required('Contract end date required'),
    contract_reason: yup.string().required('Contract reason required'),
});

export default contractSchema;
