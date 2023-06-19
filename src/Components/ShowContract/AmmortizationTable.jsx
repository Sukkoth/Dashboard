const AmmortizationTable = ({ contracts }) => {
    return (
        <>
            <h6 className='mb-4'>Ammortization Table</h6>
            <div className='table-responsive mb-5' id='ammortization'>
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th scope='col'>Period</th>
                            <th scope='col'>Year</th>
                            <th scope='col'>Payments</th>
                            <th scope='col'>Interest</th>
                            <th scope='col'>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) =>
                            contract?.ammortization.map(
                                (ammortization, index) => (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{ammortization?.year}</td>
                                        <td>{ammortization?.payment || '-'}</td>
                                        <td>{ammortization?.interest}</td>
                                        <td>{ammortization?.balance}</td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AmmortizationTable;
