import { useAuth } from "../context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(() => navigate("/", { replace: true }));
  };

  if (auth.user === null) return <NavLink to="login">Login, please</NavLink>;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p>Hello, {auth.user.username} !</p>
      <button
        onClick={handleLogout}
        style={{ height: "30px", width: "100px", fontSize: "14px" }}
      >
        Logout
      </button>
    </div>
  );
}
