import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getUserBudget,
    getAllExpenses,
    createExpense,
    getCategoryChartData,
    createBudget,
    deleteExpense,
    getAllCategories,
    updateExpense,
    updateBudget,
    getLoginUser,
    postLoginUser,
    sendUserReportEmail
} from '../api/api';
import { Budget, Expense, ExpenseFilterParams, CategoryChartData, Category, User, EmailRequest } from '../types';


// Login User
export const useLogin = () => {
    return useMutation<User, Error, string>({
        mutationFn: async (email: string) => {
            // Try GET login first
            const user = await getLoginUser(email);

            // If GET fails, fallback to POST login
            if (!user) {
                return postLoginUser(email);
            }

            return user;
        }
    });
};

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

// Get Category Chart Data
export const useCategoryChartData = (
    userId: number,
    filters: { startDate?: Date | null; endDate?: Date | null }
  ) => {
    return useQuery<CategoryChartData[]>({
      queryKey: ['chartData', userId, filters],
      queryFn: () => getCategoryChartData(userId, filters)
    });
};  

// Get User Budget
export const useUserBudget = (userId: number, month: number, year: number) => {
    return useQuery<Budget | null>({
        queryKey: ['budget', userId, month, year],
        queryFn: () => getUserBudget(userId, month, year),
    });
};

// Update Budget
export const useUpdateBudget = () => {
    const queryClient = useQueryClient();
    return useMutation<Budget, unknown, { budgetId: number; budget: Partial<Budget> }, unknown>({
        mutationFn: ({ budgetId, budget }) => updateBudget(budgetId, budget),
        onSuccess: () => {
            // Invalidate budget queries to ensure fresh data
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        },
    });
};

// Create Budget
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

// Create Expense
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

// Send User Report
export const useSendUserReportEmail = () => {
    return useMutation<string, Error, EmailRequest>({
        mutationFn: sendUserReportEmail,
    });
};
