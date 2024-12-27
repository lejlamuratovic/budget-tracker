import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title = "Error", message, onClose }) => {
  return (
    <Box sx={{ marginBottom: "1rem", position: "fixed", top: "1rem", right: "1rem" }}>
      <Alert severity="error" onClose={onClose}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
