import React, { Component } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import { House } from "@mui/icons-material";

export class Footer extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        color="primary"
        style={{ top: "auto", bottom: 0 }}
        data-testid={"footer"}
      >
        <BottomNavigation showLabels value={"test"} onChange={() => {}}>
          <BottomNavigationAction label="Home" icon={<House />} />
        </BottomNavigation>
      </AppBar>
    );
  }
}
