import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth, Role } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: Role | Role[];
  requiredAnyRole?: Role[];
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredAnyRole,
  fallback = <div>Acesso negado</div>,
}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && !auth.hasRole(requiredRole)) {
    return <>{fallback}</>;
  }

  if (requiredAnyRole && !auth.hasAnyRole(requiredAnyRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
