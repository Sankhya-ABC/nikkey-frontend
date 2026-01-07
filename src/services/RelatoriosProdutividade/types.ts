import { Tecnico } from "../Tecnico/types";

export interface RelatorioProdutividade {
  id: number;
  tecnico: Tecnico;
  horasTrabalhadas: string;
  visitasAgendadas: number;
  osRealizadas: number;
  osNaoRealizadas: number;
  visitasPendentes: number;
}
