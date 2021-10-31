import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Container,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const MobileCategoryMenu = ({ categories }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="category-button-menu"
        aria-controls="category-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<MoreVertIcon />}
        variant="contained"
        size="large"
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((category) => (
          <MenuItem key={category.idCategory}>{category.strCategory}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default function FoodCategories() {
  const [categories, setCategories] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [mobileCategories, setMobileCategories] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    let isActive = true;

    const getCategories = async () => {
      try {
        const res = await axios.get("/api/mealdb?type=getCategories");
        if (res.status === 200 && res.data) {
          setMobileCategories(res.data.categories);
          setCategories(res.data.categories.slice(0, 6));
          setCategories2(res.data.categories.slice(6, 13));
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isActive) {
      getCategories();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mb: 2 }}>
      <Box textAlign="center">
        {matches ? (
          <>
            <Divider>
              <Typography variant="h5">Categories</Typography>
            </Divider>
            {categories.map((category) => (
              <Button key={category.idCategory}>{category.strCategory}</Button>
            ))}
            {categories2.map((category) => (
              <Button key={category.idCategory}>{category.strCategory}</Button>
            ))}
            <Divider />
          </>
        ) : (
          <MobileCategoryMenu categories={mobileCategories} />
        )}
      </Box>
    </Container>
  );
}
