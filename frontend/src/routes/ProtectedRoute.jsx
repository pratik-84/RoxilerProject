import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role
}) {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;