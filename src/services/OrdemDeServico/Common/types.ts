import { Status } from "@/services/types";

export interface OrdemDeServicoCommon {
  numOS: number | null;
  status: Status;
  data: Date | null | string;
  horaInicio: Date | null | string;
  horaFim: Date | null | string;
  tecnico: {
    id: number | null;
    nome: string;
  };
  cliente: {
    id: number | null;
    nome: string;
  };
}
