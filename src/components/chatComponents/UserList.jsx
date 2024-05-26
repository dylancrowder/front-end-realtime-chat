import PropTypes from "prop-types";
import {
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";

function UserList({ dataUser, sender, handleUserConversation }) {
  return (
    <Grid className="responsive-userlist" item xs={3}>
      <Divider className="profile" style={{ margin: 15 }}>
        <Typography variant="h6" gutterBottom>
          My Profile
        </Typography>
      </Divider>

      <List>
        <ListItem button key={sender.name}>
          <ListItemIcon>
            <Avatar
              alt={sender.name}
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </ListItemIcon>
          <ListItemText primary={sender.name} />
        </ListItem>
      </List>
      <Divider />
      <Grid item xs={12} style={{ padding: "10px" }}>
        <TextField
          id="outlined-basic-email"
          label="Search"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Divider />
      <Divider style={{ margin: 15 }}>
        <Typography variant="h6" gutterBottom>
          Chats
        </Typography>
      </Divider>

      <List
        style={{
          flex: 1,
          maxHeight: "calc(42vh - 48px)",
          borderRight: "1px solid #e0e0e0",
          overflowY: "scroll",
        }}
      >
        {dataUser.map((user, index) => (
          <ListItem
            button
            onClick={() => handleUserConversation(user._id)}
            key={index}
          >
            <ListItemIcon>
              <Avatar
                alt="User Avatar"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemIcon>
            <ListItemText primary={user.name} />
            <ListItemText secondary="online" align="right" />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}

UserList.propTypes = {
  dataUser: PropTypes.array.isRequired,
  sender: PropTypes.object.isRequired,
  handleUserConversation: PropTypes.func.isRequired,
};

export default UserList;
