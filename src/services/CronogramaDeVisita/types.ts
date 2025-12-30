export enum Status {
  PENDENTE = "PENDENTE",
  REALIZADO = "REALIZADO",
  CANCELADO = "CANCELADO",
}

export const StatusColors: Record<Status, string> = {
  [Status.PENDENTE]: "warning",
  [Status.REALIZADO]: "success",
  [Status.CANCELADO]: "error",
};

export interface CronogramaDeVisita {
  id: number | null;
  status: Status;
  dataHora: Date | null | string;
  tecnico: {
    id: number | null;
    nome: string;
    telefone: string;
  };
}
