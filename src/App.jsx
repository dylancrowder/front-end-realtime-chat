import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navar";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatTest from "./components/chatComponents/Chat";
import Logout from "./components/Logout";

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<ChatTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
