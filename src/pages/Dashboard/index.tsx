import { Role, useAuth } from "../../hooks/useAuth";
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
