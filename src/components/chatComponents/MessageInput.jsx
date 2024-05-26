import PropTypes from "prop-types";
import { Grid, TextField, Button } from "@mui/material";

function MessageInput({ messageBody, setMessage, handleSendMessage }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          value={messageBody}
          size="small"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Grid>
      <Grid item xs={1} align="right">
        <Button variant="contained" size="medium" onClick={handleSendMessage}>
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

MessageInput.propTypes = {
  messageBody: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
