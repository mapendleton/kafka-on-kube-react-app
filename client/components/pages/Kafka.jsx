import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";

import { ProducerForm } from "./producer/ProducerForm";
import { DisplayArea } from "./producer/DisplayArea";

export const Kafka = () => {
  const [messages, setMessages] = useState([]);
  const [publishStatus, setPublishStatus] = useState({
    error: null,
    success: null
  });

  let counter = messages.length;

  const postMessage = async (message) => {
    const result = await axios.post("/api/kafka-ms", {
      id: 4,
      content: "something"
    });

    if ([200, 201, 204].includes(result.status)) {
      setPublishStatus({
        ...publishStatus,
        error: null,
        success: "Message published..."
      });

      counter += 1;
      setMessages([...messages, { text: message, id: counter }]);
    } else {
      setPublishStatus({
        ...publishStatus,
        error: "Error publishing message: ${result.message}",
        success: null
      });
    }
  };
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
          setMessages={postMessage}
        />
        {publishStatus.error ? (
          <Alert data-testid="alert-error" sx={{ m: 5 }} severity="error">
            Message NOT published! Please resubmit.
          </Alert>
        ) : publishStatus.success ? (
          <Alert data-testid="alert-success" sx={{ m: 5 }} severity="success">
            Message published!
          </Alert>
        ) : null}

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
