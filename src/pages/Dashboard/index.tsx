import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../types";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardCommon } from "./DashboardCommon";

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
