import { Navigate } from "react-router-dom";

function ProtectedRoute({ pageRoute }) {
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute token:", token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return pageRoute;
}

export default ProtectedRoute;