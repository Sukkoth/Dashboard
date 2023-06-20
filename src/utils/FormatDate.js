const FormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
};

export default FormatDate;
