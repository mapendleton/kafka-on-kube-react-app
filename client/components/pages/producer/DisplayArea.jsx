import React from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography } from "@mui/material";

export const DisplayArea = ({ messages }) => {
  const display = () => {
    return messages.map((m, ind) => {
      console.log(`ind: `, ind);
      return (
        <Box key={{ ind }} sx={{ pt: 2 }}>
          {m}
        </Box>
      );
    });
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      {messages.length >= 1 ? (
        <Card sx={{ p: 3 }}>
          <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
            <b>Submitted Messages</b>
          </Typography>
          {display()}
        </Card>
      ) : null}
    </Box>
  );
};

DisplayArea.propTypes = {
  messages: PropTypes.Array
};
