export enum Status {
  PENDENTE = "PENDENTE",
  REALIZADO = "REALIZADO",
  CANCELADO = "CANCELADO",
}

export interface OrdemDeServico {
  id: number | null;
  status: Status;
  data: Date | null | string;
  horaInicio: Date | null | string;
  horaFim: Date | null | string;
  tecnico: {
    id: number | null;
    nome: string;
  };
}

export const StatusColors: Record<Status, string> = {
  [Status.PENDENTE]: "warning",
  [Status.REALIZADO]: "success",
  [Status.CANCELADO]: "error",
};
