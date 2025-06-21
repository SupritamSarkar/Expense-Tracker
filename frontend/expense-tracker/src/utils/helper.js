import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // Regular expression to validate email format
    return regex.test(email);
}

export const addThousandsSeperator = (num) =>{
    if(num==null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(",");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
    ?`${formattedInteger}, ${fractionalPart}`
    : formattedInteger;
};



export const prepareIncomeBarChartData = (data) => {
    if (!Array.isArray(data)) {
        return []; // ✅ Always return empty array if data is not array
    }

    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount || 0,
        source: item?.source || '',
    }));
};

