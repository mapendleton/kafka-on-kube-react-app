import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { DisplayArea } from "./DisplayArea";
import PropTypes from "prop-types";

export const ProducerForm = ({ messages, setMessages }) => {
  const [messageText, setMessageText] = useState("");

  const handleClick = () => {
    setMessages([...messages, messageText]);
    setMessageText("");
  };

  const handleTextChange = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ p: 3 }}
    >
      <Grid item xs={8} direction="column">
        <TextField
          id="producer-message"
          label="Message"
          placeholder="Submit a kafka message"
          variant="standard"
          fullWidth
          value={messageText}
          onChange={handleTextChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
      </Grid>
      <Grid item xs={4} direction="column">
        <Button
          variant="contained"
          onClick={handleClick}
          data-testid={"submit-message-button"}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

ProducerForm.propTypes = {
  messages: PropTypes.Array,
  setMessages: PropTypes.func
};
