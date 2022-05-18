import { Box, Typography, ToggleButton, Alert, Checkbox } from "@mui/material";
import { Check } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import { useInterval } from "usehooks-ts";

import { ProducerForm } from "./producer/ProducerForm";
import { DisplayArea } from "../common/DisplayArea";

export const Kafka = () => {
  const [messages, setMessages] = useState([]);
  const [publishStatus, setPublishStatus] = useState({
    error: null,
    success: null
  });
  const [consumedMessages, setConsumedMessages] = useState([]);
  // Dynamic delay
  const [delay, setDelay] = useState(2000);
  // ON/OFF
  const [isPlaying, setPlaying] = useState(false);
  const [selected, setSelected] = useState(false);

  let counter = messages.length;
  let consumerCounter = consumedMessages.length;

  useInterval(
    () => {
      console.log(`consuming messages from kafka topic...`);
      setConsumedMessages([
        ...consumedMessages,
        { text: "test-message", id: consumerCounter }
      ]);
      consumerCounter++;
      // fetch messages from consumer
      // setCount(count + 1);
    },
    // Delay in milliseconds or null to stop it
    selected ? delay : null
  );

  const postMessage = async (message) => {
    try {
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
    } catch (e) {
      setPublishStatus({
        ...publishStatus,
        error: "Error publishing message: ${e.stack}",
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
      <Box data-testid="producer" sx={{ p: 5 }}>
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

        <DisplayArea
          maxWidth={"lg"}
          messages={messages}
          title={"Messages Submitted"}
        />
      </Box>
      <Box data-testid="consumer" sx={{ p: 5 }}>
        <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
          <b>Consumer Demo</b>
        </Typography>
        <div align="center">
          <Box
            sx={{
              display: "inline-grid"
            }}
          >
            <Typography color="text.secondary">
              <p>Consume Messages?</p>
            </Typography>
          </Box>
          <Checkbox onChange={() => setSelected(!selected)} />

          <DisplayArea
            align="left"
            maxWidth={"lg"}
            messages={consumedMessages}
            title={"Consumed Messages"}
          />
        </div>
      </Box>
    </Box>
  );
};
