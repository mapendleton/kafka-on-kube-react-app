import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import { ProducerForm } from "./producer/ProducerForm";
import { DisplayArea } from "./producer/DisplayArea";

export const Kafka = () => {
  const [messages, setMessages] = useState([]);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(2, 1fr)",
        p: 2
      }}
    >
      <Box data-testid="producer">
        <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
          <b>Producer Demo</b>
        </Typography>
        <ProducerForm
          maxWidth={"lg"}
          messages={messages}
          setMessages={setMessages}
        />
        <DisplayArea maxWidth={"lg"} messages={messages} />
      </Box>
      <Box data-testid="consumer">
        <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
          <b>Consumer Demo</b>
        </Typography>
      </Box>
    </Box>
  );
};
