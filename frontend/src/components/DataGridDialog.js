import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function ConfirmDeleteDialog({
  open,
  title = "Confirm Delete",
  content = "Are you sure you want to delete this record?",
  handleClose,
  handleConfirm,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          No
        </Button>
        <Button onClick={handleConfirm} variant="outlined" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
