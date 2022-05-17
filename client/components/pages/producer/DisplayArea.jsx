import React from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography } from "@mui/material";

export const DisplayArea = ({ messages }) => {
  const messageList = () => {
    const messagesSubmitted = messages.map((m) => {
      return (
        <Box key={m.id} sx={{ pt: 2 }}>
          {m.text}
        </Box>
      );
    });
    return <>{messagesSubmitted}</>;
  };

  return (
    <Box key="boxkey" sx={{ minWidth: 275 }}>
      {messages.length >= 1 ? (
        <Card key="cardkey" sx={{ p: 3 }}>
          <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
            <b>Submitted Messages</b>
          </Typography>
          {messageList()}
        </Card>
      ) : null}
    </Box>
  );
};

DisplayArea.propTypes = {
  messages: PropTypes.array
};
