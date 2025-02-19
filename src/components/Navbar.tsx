import { useNavigate } from "react-router-dom";
import {UserAuthContext} from "../pages/ProtectedRoute"

export const Navbar = () => {
  const navigate = useNavigate();
  const userAuthContext = UserAuthContext();
  const user = userAuthContext?.user;
  const signout = userAuthContext?.signout;
  const handleLogout = () => {
    signout();
    navigate("/");
  }
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img src="/chat-app-sockets/logo.png" alt="TeleP" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold">Chat-App</span>
      </div>
      <div className="flex items-center">
        {user && <span className="mr-4">Hello, {user.email}</span>}
        {user?.email && <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>}
      </div>
    </nav>
  );
};

///src="https://w7.pngwing.com/pngs/941/692/png-transparent-black-small-apple-logo-logo-material-apple-logo-black-thumbnail.png"