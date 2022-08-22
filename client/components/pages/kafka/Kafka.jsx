import { Box, Typography, Alert, Checkbox } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ProducerForm } from "./producer/ProducerForm";
import { DisplayArea } from "../../common/DisplayArea";
//import { logger } from "../../../../util/logger";

export const Kafka = () => {
  const kafkaServicePath = process.env.NODE_ENV === "production" ? "http://kafka-ms:8084" : "http://localhost:8084";
  const [messages, setMessages] = useState([]);
  const [publishStatus, setPublishStatus] = useState({
    error: null,
    success: null
  });
  const [consumedMessages, setConsumedMessages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [client, setClient] = useState(null);
  const handleChange = (event) => {
    if (event.target.checked) {
      connect();
    } else {
      disconnect();
    }
    setIsChecked((current) => !current);
  };
  let counter = messages.length;

  /*************************************************************/
  function connect() {
    const _client = new Client({
      debug: function (str) {
        console.log(str);
      },
      webSocketFactory: function () {
        return new SockJS(`${kafkaServicePath}/kafka-consumer`);
      },
      onConnect: function (frame) {
        console.log("connected: "+ frame.body);
        _client.subscribe("/topic/consumer", function (message) {
              setConsumedMessages((current) => [
                ...current,
                { text: JSON.parse(message.body).content, id: (counter += 1) }
              ]);
        });
        setClient(_client);
      },
      onDisconnect: function (frame) {
        console.log("DISCONNECTED: "+frame);
      },
      onWebSocketClose: function () {
        console.log("WEBSOCKET CLOSED...");
      },
      reconnectDelay: 0,
    });
    _client.activate();
  }

  function disconnect() {
    if (client !== null) {
      console.log("attempting to disconnect...");
      client.deactivate();
    }
    else console.log("client was null");
    console.log("Disconnected...");
  }
  /*************************************************************/

  const postMessage = async (message) => {
    try {
      const result = await axios.post("/api/kafka-ms", {
        id: messages.length,
        content: message
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
        console.error(
          "ERROR publishing message {} : {} ",
          publishStatus.error,
          result.message
        );
      }
    } catch (e) {
      setPublishStatus({
        ...publishStatus,
        error: "Error publishing message:"+e.stack+"MESSAGE: "+e.message,
        success: null
      });
      console.error(
        "ERROR publishing message %s : Stack = %s",
        publishStatus.error,
        e.stack
      );
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
            <Typography color="text.secondary">Consume Messages?</Typography>
          </Box>
          <Checkbox
            data-testid="consume-checkbox"
            value={isChecked}
            onChange={handleChange}
          />

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
