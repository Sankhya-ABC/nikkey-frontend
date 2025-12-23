import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { ROUTES } from "@/routes";
import { Role } from "@/types";
import { useAuth } from "../../hooks/useAuth";
import { Unauthorized } from "../../pages/Unauthorized";

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
  fallback = <Unauthorized />,
}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (requiredRole && !auth.hasRole(requiredRole)) {
    return <>{fallback}</>;
  }

  if (requiredAnyRole && !auth.hasAnyRole(requiredAnyRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
