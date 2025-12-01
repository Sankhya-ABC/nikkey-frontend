import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types";
import { DashboardAdmin } from "./Admin";
import { DashboardCommon } from "./Common";

export const Dashboard = () => {
  const { hasRole } = useAuth();

  if (hasRole(Role.ADMIN)) {
    return <DashboardAdmin />;
  }

  if (hasRole(Role.COMMON)) {
    return <DashboardCommon />;
  }

  return null;
};
