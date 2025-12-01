export enum Status {
  PENDENTE = "PENDENTE",
  REALIZADO = "REALIZADO",
  CANCELADO = "CANCELADO",
}

export interface CronogramaDeVisitas {
  id: number | null;
  status: Status;
  dataHora: Date | null | string;
  tecnico: {
    id: number | null;
    nome: string;
    telefone: string;
  };
}

export const StatusColors: Record<Status, string> = {
  [Status.PENDENTE]: "warning",
  [Status.REALIZADO]: "success",
  [Status.CANCELADO]: "error",
};
