import PropTypes from "prop-types";
import { Button } from "@mui/material";

function ChatHeader({ isVisible, setIsVisible }) {
  return (
    
    <Button
      onClick={() => setIsVisible(!isVisible)}
      style={{ display: window.innerWidth < 1200 ? "block" : "none" }}
    >
      {isVisible ? "Hide SSUser List" : "Show User List"}
    </Button>
  );
}

ChatHeader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};

export default ChatHeader;
