import { Tecnico } from "../Tecnico/types";
import { Status } from "../types";

export interface CronogramaDeVisita {
  id: number | null;
  status: Status;
  dataHora: Date | null | string;
  tecnico: Tecnico;
}
