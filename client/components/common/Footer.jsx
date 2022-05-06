import React, { Component } from "react";
import { AppBar, BottomNavigation } from "@mui/material";

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
          <p>&lt; insert disclosure and footer info here&gt;</p>
        </BottomNavigation>
      </AppBar>
    );
  }
}
