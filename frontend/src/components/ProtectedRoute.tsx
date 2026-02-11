import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role?: string;
}

export function ProtectedRoute({ children, role }: Props) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;

  if (role && user.role !== role)
    return <Navigate to="/admin" replace />;

  return <>{children}</>;
}
