import { Tecnico } from "@/services/Tecnico/types";
import { Status } from "@/services/types";

export interface OrdemDeServico {
  id: number | null;
  status: Status;
  data: Date | null | string;
  horaInicio: Date | null | string;
  horaFim: Date | null | string;
  tecnico: Tecnico;
}
