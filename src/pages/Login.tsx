import { useEffect, useState } from "react";
import { UserAuthContext } from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const authContext = UserAuthContext();
  const signin = authContext?.signin;
  const user = authContext?.user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
          onClick={() => signin({ email, password })}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
