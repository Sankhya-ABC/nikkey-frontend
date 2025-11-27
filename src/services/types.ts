export enum CRUDType {
  CREATE = "Cadastrar",
  READ = "Visualizar",
  UPDATE = "Editar",
  DELETE = "Deletar",
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
