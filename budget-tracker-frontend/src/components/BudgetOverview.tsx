import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { useUserBudget, useUpdateBudget, useCreateBudget } from "../hooks/useApi";
import Loading from "./Loading";

interface BudgetOverviewProps {
  userId: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ userId }) => {
  const currentDate = new Date();

  const [filters, setFilters] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });
  const [appliedFilters, setAppliedFilters] = useState(filters); // Tracks the filters applied when "Apply Filters" is clicked
  const [newBudgetAmount, setNewBudgetAmount] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: budget, isLoading, isError } = useUserBudget(
    userId,
    appliedFilters.month,
    appliedFilters.year
  );

  const updateBudgetMutation = useUpdateBudget();
  const createBudgetMutation = useCreateBudget();
  const isUpdating = updateBudgetMutation.isPending || createBudgetMutation.isPending;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleAddBudget = () => {
    if (newBudgetAmount === null || isNaN(newBudgetAmount)) return;

    createBudgetMutation.mutate(
      { userId, month: appliedFilters.month, year: appliedFilters.year, amount: newBudgetAmount },
      {
        onSuccess: () => {
          setIsEditing(false);
          setNewBudgetAmount(null);
        },
      }
    );
  };

  const handleUpdateBudget = () => {
    if (newBudgetAmount === null || isNaN(newBudgetAmount)) return;

    if (!budget) return;

    updateBudgetMutation.mutate(
      { budgetId: budget.id, budget: { ...budget, amount: newBudgetAmount } },
      {
        onSuccess: () => {
          setIsEditing(false);
          setNewBudgetAmount(null);
        },
      }
    );
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <Typography color="error" align="center">
        Error loading budget. Please try again.
      </Typography>
    );
  }

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom mb={4} mt={1}>
        Monthly Budget Overview
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Month"
            type="number"
            name="month"
            fullWidth
            size="small"
            value={filters.month}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Year"
            type="number"
            name="year"
            fullWidth
            size="small"
            value={filters.year}
            onChange={handleFilterChange}
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

      {/* Budget Details */}
      <Grid container spacing={4} sx={{ marginTop: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardHeader title="Total Budget" />
            <CardContent>
              <Typography variant="h4" color="primary">
                ${budget?.amount || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardHeader title="Remaining Budget" />
            <CardContent>
              <Typography variant="h4" color="success">
                ${budget?.remaining || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add or Edit Budget */}
      {isEditing ? (
        <Box sx={{ marginTop: "2rem"}}>
          <TextField
            label="New Budget Amount"
            type="number"
            size="small"
            value={newBudgetAmount || ""}
            onChange={(e) => setNewBudgetAmount(Number(e.target.value))}
            fullWidth
            sx={{ maxWidth: "340px"}}
          />
          <Grid
            container
            sx={{ marginTop: "1rem" }}
            justifyContent="start"
            alignItems="start"
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={budget ? handleUpdateBudget : handleAddBudget}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <CircularProgress size={20} />
              ) : budget ? "Update Budget" : "Add Budget"}
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box textAlign="left" sx={{ marginTop: "2rem" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsEditing(true);
              setNewBudgetAmount(budget?.amount || 0);
            }}
          >
            {budget ? "Edit Budget" : "Add Budget"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default BudgetOverview;
