import React from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import ExpenseOverview from "../components/ExpenseOverview";
// import BudgetOverview from "../components/BudgetOverview";
// import ChartOverview from "../components/ChartOverview";

const DashboardPage: React.FC = () => {
  const email = localStorage.getItem("email");

  if (!email) {
    return (
      <Box sx={{ textAlign: "center", padding: "2rem" }}>
        <Typography variant="h6">Please log in.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Welcome, {email}
      </Typography>
      <Grid container spacing={3}>
        {/* Expense Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "1rem" }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Expenses
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="#expenses"
            >
              View Expenses
            </Button>
          </Paper>
        </Grid>

        {/* Chart Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "1rem" }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Charts
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="#charts"
            >
              View Charts
            </Button>
          </Paper>
        </Grid>

        {/* Budget Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "1rem" }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Budgets
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              href="#budgets"
            >
              View Budgets
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Sections */}
      <Box id="expenses" sx={{ marginTop: "2rem" }}>
        <ExpenseOverview userId={1} />
      </Box>
      <Box id="charts" sx={{ marginTop: "2rem" }}>
        {/* <ChartOverview /> */}
      </Box>
      <Box id="budgets" sx={{ marginTop: "2rem" }}>
        {/* <BudgetOverview /> */}
      </Box>
    </Box>
  );
};

export default DashboardPage;
