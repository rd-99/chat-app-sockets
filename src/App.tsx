import {  BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import ProtectedRoutes from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import { PrivateRoute } from "./pages/PrivateRoute";
import User from "./pages/User";
function App() {
  return (
    <BrowserRouter>
    <ProtectedRoutes>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/chatroom"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    </ProtectedRoutes>
    </BrowserRouter>
  );
}

export default App;
