import PropTypes from "prop-types";
import { List, ListItem, ListItemText, Grid } from "@mui/material";

function MessageList({ dataChat, sender, messageListRef }) {
  return (
    <List
      ref={messageListRef}
      style={{
        flex: 1,
        overflowY: "auto",
        maxHeight: "calc(75vh - 48px)",
      }}
    >
      {dataChat.messages.map((message, index) => (
        <ListItem key={index}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align={message.sender === sender._id ? "right" : "left"}
                primary={message.body}
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                align={message.sender === sender._id ? "right" : "left"}
                secondary={message.createdAt}
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}

MessageList.propTypes = {
  dataChat: PropTypes.object.isRequired,
  sender: PropTypes.object.isRequired,
  messageListRef: PropTypes.object.isRequired,
};

export default MessageList;
