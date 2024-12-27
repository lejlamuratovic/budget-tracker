import React, { useState } from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import ExpenseOverview from "../components/ExpenseOverview";
import BudgetOverview from "../components/BudgetOverview";
import ChartOverview from "../components/ChartOverview";

const DashboardPage: React.FC = () => {
  const email = localStorage.getItem("email");
  const [activeSection, setActiveSection] = useState<"expenses" | "charts" | "budgets">("expenses");

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

      {/* Section Selector */}
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
              onClick={() => setActiveSection("expenses")}
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
              onClick={() => setActiveSection("charts")}
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
              onClick={() => setActiveSection("budgets")}
            >
              View Budgets
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Render Active Section */}
      <Box sx={{ marginTop: "2rem" }}>
        {activeSection === "expenses" && <ExpenseOverview userId={1} />}
        {activeSection === "charts" && <ChartOverview userId={1} />}
        {activeSection === "budgets" && <BudgetOverview userId={1}/>}
      </Box>
    </Box>
  );
};

export default DashboardPage;
