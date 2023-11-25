/**
 * @description  Sort the given filtered data and then paginate them
 * @returns {object}
 */

const isDateString = (value) => {
    return (
        typeof value === 'string' &&
        value.length === 10 &&
        value.split('-').length === 3
    );
};

const compareValues = (a, b, sortType) => {
    if (isDateString(a) && isDateString(b)) {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return sortType === 'asc' ? dateA - dateB : dateB - dateA;
    }
    // Use localeCompare for case-insensitive string comparison
    const compareResult = String(a).localeCompare(String(b), undefined, {
        sensitivity: 'base',
    });

    return sortType === 'asc' ? compareResult : -compareResult;
};

export const getData = (sortColumn, sortType, filteredData, limit, page) => {
    if (sortColumn && sortType) {
        return filteredData
            .sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                return compareValues(x, y, sortType);
            })
            .filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });
    }
    return filteredData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });
};
