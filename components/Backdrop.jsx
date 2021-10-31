import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function BackdropLoader({ isVisible }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (isActive && isVisible !== undefined) {
      setOpen(isVisible);
    }

    return () => {
      isActive = false;
    };
  }, [isVisible]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
