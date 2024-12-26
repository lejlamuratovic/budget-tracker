import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getUserBudget,
    getAllExpenses,
    createExpense,
    getCategoryChartData,
    createBudget,
    deleteExpense,
    getAllCategories,
    updateExpense
} from '../api/api';
import { Budget, Expense, ExpenseFilterParams, CategoryChartData, Category } from '../types';

// Get All Expenses
export const useExpenses = (params: ExpenseFilterParams) => {
    return useQuery<Expense[]>({
        queryKey: ['expenses', params],
        queryFn: () => getAllExpenses(params),
    });
};

// Get All Categories
export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => getAllCategories(),
    });
};

// Update Expense
export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation<Expense, unknown, { id: number; expense: Expense }, unknown>({
        mutationFn: updateExpense,
        onSuccess: () => {
            // Invalidate the 'expenses' query to refresh the expense list
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

// Delete Expense
export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation<void, unknown, number>({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

////////
export const useUserBudget = (userId: number, month: number, year: number) => {
    return useQuery<Budget | null>({
        queryKey: ['budget', userId, month, year],
        queryFn: () => getUserBudget(userId, month, year),
    });
};

export const useCreateBudget = () => {
    const queryClient = useQueryClient();
    return useMutation<Budget, unknown, Partial<Budget>, unknown>({
        mutationFn: createBudget,
        onSuccess: () => {
            // Invalidate budget queries to ensure fresh data
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        },
    });
};


export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation<Expense, unknown, Partial<Expense>, unknown>({
        mutationFn: createExpense,
        onSuccess: () => {
            // Invalidate expense queries to refresh expense list
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useCategoryChartData = (userId: number) => {
    return useQuery<CategoryChartData[]>({
        queryKey: ['chartData', userId],
        queryFn: () => getCategoryChartData(userId),
    });
};
