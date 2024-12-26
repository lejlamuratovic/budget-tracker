import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useCategories, useCreateExpense, useUpdateExpense } from "../hooks/useApi";
import { Expense } from "../types";

interface ExpenseEditModalProps {
  mode: "add" | "edit";
  userId: number;
  expense?: Expense;
  onClose: () => void;
  onSuccess: () => void;
}

const ExpenseEditModal: React.FC<ExpenseEditModalProps> = ({ mode, expense, onClose, onSuccess, userId }) => {
  const { data: categories = [] } = useCategories();
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();

  const [formData, setFormData] = useState({
    title: expense?.title || "",
    amount: expense?.amount || 0,
    date: expense?.date || "",
    categoryId: expense?.categoryId || 1,
    userId: userId
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = () => {
    if (mode === "add") {
      createExpense.mutate(formData, {
        onSuccess: () => {
          onSuccess();
          onClose();
        },
      });
    } else if (mode === "edit" && expense && expense.id) {
      updateExpense.mutate(
        { 
          id: expense.id, 
          expense: { ...formData, userId: expense.userId } 
        },
        {
          onSuccess: () => {
            onSuccess();
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>{mode === "add" ? "Add New Expense" : "Edit Expense"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.date.split("T")[0]} // Ensure proper date format
          onChange={handleInputChange}
        />
        <TextField
          select
          label="Category"
          name="categoryId"
          fullWidth
          margin="normal"
          value={formData.categoryId?.toString()}
          onChange={handleInputChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {mode === "add" ? "Add Expense" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseEditModal;
