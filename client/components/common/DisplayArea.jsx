import React from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography } from "@mui/material";

export const DisplayArea = ({ messages, title }) => {
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
        <Card align="center" key="cardkey" sx={{ p: 3 }}>
          <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
            <b>{title}</b>
          </Typography>
          {messageList()}
        </Card>
      ) : null}
    </Box>
  );
};

DisplayArea.propTypes = {
  messages: PropTypes.array,
  title: PropTypes.string
};
