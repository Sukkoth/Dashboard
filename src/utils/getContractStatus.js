/**
 * @param {string} start
 * @param {string} end
 * @returns {string}
 */
function getContractStatus(contractEndDate) {
    const currentDate = new Date();
    const endDate = new Date(contractEndDate);

    if (currentDate > endDate) {
        return 'Contract has already expired.';
    } else {
        const timeDifference = endDate.getTime() - currentDate.getTime();
        const millisecondsInOneDay = 1000 * 60 * 60 * 24;
        const daysDifference = Math.ceil(timeDifference / millisecondsInOneDay);

        return `Contract expires in ${daysDifference} days.`;
    }
}

export default getContractStatus;
