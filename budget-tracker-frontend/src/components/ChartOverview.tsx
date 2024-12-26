import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useCategoryChartData } from "../hooks/useApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#F5B041"];

interface ChartOverviewProps {
  userId: number;
}

const ChartOverview: React.FC<ChartOverviewProps> = ({ userId }) => {
  const [filters, setFilters] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const { data: chartData = [], isLoading, isError } = useCategoryChartData(userId, filters);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value ? new Date(value) : null,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ startDate: null, endDate: null });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center">
        Error loading chart data. Please try again.
      </Typography>
    );
  }

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom textAlign="start" mb={4} mt={1}>
        Expense Chart Overview
      </Typography>
      <Box sx={{ marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.startDate ? filters.startDate.toISOString().split("T")[0] : ""}
              onChange={handleFilterChange}
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
              value={filters.endDate ? filters.endDate.toISOString().split("T")[0] : ""}
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
            <Button variant="contained" color="primary" onClick={() => {}}>
              Apply Filters
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
      {chartData.length === 0 ? (
        <Typography align="center">No data available to display the chart.</Typography>
      ) : (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="expenseCount"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Summary:
              </Typography>
              {chartData.map((item, index) => (
                <Typography key={index}>
                  {item.categoryName}: {item.expenseCount} expenses
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default ChartOverview;
