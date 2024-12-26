import axios from 'axios';
import { Budget, Category, CategoryChartData, Expense, ExpenseFilterParams } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

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

//////////////

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

export const getCategoryChartData = async (userId: number): Promise<CategoryChartData[]> => {
    const response = await api.get<CategoryChartData[]>('/expenses/chart-data', { params: { userId } });
    return response.data;
};


export default api;
