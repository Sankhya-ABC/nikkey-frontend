import { Role, useAuth } from "../../hooks/useAuth";

export const Dashboard = () => {
  const { hasRole } = useAuth();

  if (hasRole(Role.ADMIN)) {
    return <Dashboard />;
  }

  return <Dashboard />;
};
