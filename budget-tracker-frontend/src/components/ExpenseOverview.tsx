import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  List,
  Typography,
  Paper,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQueryClient } from "@tanstack/react-query";
import { useExpenses, useDeleteExpense, useCategories } from "../hooks/useApi";
import { ExpenseFilterParams, Expense } from "../types";
import Loading from "./Loading";
import ExpenseEditModal from "./ExpenseEditModal";
import ExpenseRow from "./ExpenseRow";

const ExpenseOverview: React.FC<{ userId: number }> = ({ userId = 1 }) => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<ExpenseFilterParams>({
    userId,
    startDate: null,
    endDate: null,
    minAmount: null,
    maxAmount: null,
    categoryId: null,
    month: null,
    year: null,
  });
  const [tempFilters, setTempFilters] = useState<ExpenseFilterParams>({ ...filters });

  const { data: expenses = [], isLoading, isError } = useExpenses(filters);
  const { data: categories = [] } = useCategories();
  const deleteExpense = useDeleteExpense();

  // State for managing the modal
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleTempFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTempFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "categoryId" ? (value !== "" ? parseInt(value, 10) : null) : value || null,
    }));
  };

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters });
  };

  const handleClearFilters = () => {
    const resetFilters = {
      userId,
      startDate: null,
      endDate: null,
      minAmount: null,
      maxAmount: null,
      categoryId: null,
      month: null,
      year: null,
    };
    setTempFilters(resetFilters);
    setFilters(resetFilters);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalMode("edit");
  };

  const handleDeleteExpense = (expenseId: number) => {
    deleteExpense.mutate(expenseId, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
    });
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setModalMode("add");
  };

  if (isError) {
    return <Typography>Error fetching expenses.</Typography>;
  }

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom mb={4} mt={1}>
        Expense Overview
        <IconButton
          color="primary"
          sx={{ marginLeft: 2 }}
          onClick={handleAddExpense} // Open modal for adding
        >
          <AddIcon />
        </IconButton>
      </Typography>

      {/* Filters */}
      <Box component="form" sx={{ marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onChange={handleTempFilterChange}
              value={tempFilters.startDate ? tempFilters.startDate.toISOString().split("T")[0] : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              type="date"
              name="endDate"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onChange={handleTempFilterChange}
              value={tempFilters.endDate ? tempFilters.endDate.toISOString().split("T")[0] : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Min Amount"
              type="number"
              name="minAmount"
              fullWidth
              size="small"
              onChange={handleTempFilterChange}
              value={tempFilters.minAmount || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Max Amount"
              type="number"
              name="maxAmount"
              fullWidth
              size="small"
              onChange={handleTempFilterChange}
              value={tempFilters.maxAmount || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Category"
              name="categoryId"
              fullWidth
              size="small"
              onChange={handleTempFilterChange}
              value={tempFilters.categoryId !== null ? tempFilters.categoryId?.toString() : ""}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Month"
              type="number"
              name="month"
              fullWidth
              size="small"
              onChange={handleTempFilterChange}
              value={tempFilters.month || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Year"
              type="number"
              name="year"
              fullWidth
              size="small"
              onChange={handleTempFilterChange}
              value={tempFilters.year || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            container
            gap={2}
            justifyContent="start"
            alignItems="start"
          >
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Expenses List */}
      {isLoading && <Loading />}
      {expenses.length === 0 && !isLoading && <Typography>No expenses found.</Typography>}
      <List>
        {expenses.map((expense) => (
          <ExpenseRow
            key={expense.id}
            expense={expense}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        ))}
      </List>

      {/* Modal for Add or Edit */}
      {modalMode && (
        <ExpenseEditModal
          mode={modalMode}
          userId={userId}
          expense={modalMode === "edit" && selectedExpense ? selectedExpense : undefined}
          onClose={() => setModalMode(null)}
          onSuccess={() => {
            setModalMode(null);
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
          }}
        />
      )}
    </Paper>
  );
};

export default ExpenseOverview;
