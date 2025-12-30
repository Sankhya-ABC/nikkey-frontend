import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types";

import { OrdensDeServicoAdmin } from "./Admin";
import { OrdensDeServicoCommon } from "./Common";

export const OrdensDeServico = () => {
  const { hasRole } = useAuth();

  if (hasRole(Role.ADMIN)) {
    return <OrdensDeServicoAdmin />;
  }

  if (hasRole(Role.COMMON)) {
    return <OrdensDeServicoCommon />;
  }

  return null;
};
