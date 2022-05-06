import React, { Component } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

export class Header extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }} data-testid={"header"}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              color="common.white"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              GAP Tech
            </Typography>
            <Button>
              <Typography
                color="common.white"
                variant="subtitle1"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Login
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
