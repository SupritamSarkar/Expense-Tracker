export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // Regular expression to validate email format
    return regex.test(email);
}