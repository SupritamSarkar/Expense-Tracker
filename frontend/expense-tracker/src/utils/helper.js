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