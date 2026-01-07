import { Tecnico } from "@/services/Tecnico/types";
import { Status } from "@/services/types";

export interface OrdemDeServico {
  numOS: number | null;
  status: Status;
  data: Date | null | string;
  horaInicio: Date | null | string;
  horaFim: Date | null | string;
  tecnico: Tecnico;
}
