export const BASE_URL = 'http://localhost:8000';

// This is the base URL for the API, which can be used to construct full API endpoints

export const API_PATHS = {
    AUTH : {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
        
    },

    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard/data"
    },

    INCOME: {
        ADD_INCOME : "/api/v1/income/add",
        GET_INCOMES: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
    },

    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_EXPENSES: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
    }

};
