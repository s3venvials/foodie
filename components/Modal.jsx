import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal({
  onClose,
  open,
  title,
  dialogContentText,
  children,
  btnActions,
}) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>{btnActions}</DialogActions>
      </Dialog>
    </div>
  );
}
