import axios from 'axios';
import { Budget, Category, CategoryChartData, Expense, ExpenseFilterParams, User } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// GET Login
export const getLoginUser = async (email: string): Promise<User | null> => {
    try {
        const response = await api.get<User>('/users/login', {
            params: { email },
        });
        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

// POST Login (Create User)
export const postLoginUser = async (email: string): Promise<User> => {
    const response = await api.post<User>('/users/login', { email });
    return response.data;
};

export const getAllExpenses = async (params: ExpenseFilterParams): Promise<Expense[]> => {
    const response = await api.get<Expense[]>('/expenses/filter', { params });
    return response.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
};

export const updateExpense = async ({ id, expense }: { id: number; expense: Partial<Expense> }): Promise<Expense> => {
    const response = await api.put<Expense>(`/expenses/${id}`, expense);
    return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
    await api.delete(`/expenses/${id}`);
};

export const getCategoryChartData = async (
    userId: number,
    filters: { startDate?: Date | null; endDate?: Date | null }
  ): Promise<CategoryChartData[]> => {
    const params: { userId: number; startDate?: string; endDate?: string} = { userId };
    if (filters.startDate) params.startDate = filters.startDate.toISOString().split("T")[0];
    if (filters.endDate) params.endDate = filters.endDate.toISOString().split("T")[0];
  
    const response = await api.get<CategoryChartData[]>('/expenses/chart-data', { params });
    return response.data;
  };  

export const getUserBudget = async (userId: number, month: number, year: number): Promise<Budget | null> => {
    const response = await api.get<Budget | null>('/budgets/user', { params: { userId, month, year } });
    return response.data;
};

export const createExpense = async (expense: Partial<Expense>): Promise<Expense> => {
    const response = await api.post<Expense>('/expenses', expense);
    return response.data;
};

export const createBudget = async (budget: Partial<Budget>): Promise<Budget> => {
    const response = await api.post<Budget>('/budgets', budget);
    return response.data;
};

export const updateBudget = async (budgetId: number, budget: Partial<Budget>): Promise<Budget> => {
    const response = await api.put<Budget>(`/budgets/${budgetId}`, budget);
    return response.data;
};

export default api;
