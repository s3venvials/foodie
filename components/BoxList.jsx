import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BoxList({ data = [], onDelete }) {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {data.map((item, i) => (
            <ListItem key={item} button divider>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <ListItemText primary={item} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemIcon onClick={onDelete.bind(this, i)}>
                    <DeleteIcon />
                  </ListItemIcon>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
