import { useEffect, useState } from "react";
import { UserAuthContext } from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { signin, user } = UserAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center h-screen py-4 m-4 ">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="" onClick={() => signin({ email, password })}>
        Sign In
      </button>
    </div>
  );
}

export default Login;
