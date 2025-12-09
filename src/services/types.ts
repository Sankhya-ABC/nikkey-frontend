export enum CRUDType {
  CREATE = "Cadastrar",
  READ = "Visualizar",
  UPDATE = "Editar",
  DELETE = "Deletar",
}

export interface ParamsForPagination {
  per_page: number;
  current_page: number;
  search?: string;
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
