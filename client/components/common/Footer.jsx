import React, { Component } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Typography
} from "@mui/material";
import { House } from "@mui/icons-material";

export class Footer extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        color="primary"
        style={{
          top: "auto",
          bottom: 0,
          minHeight: 65
        }}
        data-testid={"footer"}
      >
        <Typography
          variant="body1"
          noWrap
          component="a"
          href="/"
          sx={{
            fontFamily: "monospace",
            fontWeight: 200,
            letterSpacing: ".3rem",
            color: "#fafafa",
            border: 0,
            p: 2,
            fontStyle: "normal"
          }}
          align={"center"}
        >
          Home
        </Typography>
      </AppBar>
    );
  }
}
