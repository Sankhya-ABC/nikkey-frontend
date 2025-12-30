export enum CRUDType {
  CREATE = "Cadastrar",
  READ = "Visualizar",
  UPDATE = "Editar",
  DELETE = "Deletar",
}

export interface ParamsForPagination {
  per_page: number;
  page: number;
  search?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface GetAllPaginated<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface ErrorMessage {
  message: string;
  exception: string;
  file: string;
  line: number;
  trace: [];
}

export interface Trace {
  file: string;
  line: number;
  function: string;
  class: string;
  type: string;
}

export interface Dominio {
  id: number | null | "";
  descricao: string;
}

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
