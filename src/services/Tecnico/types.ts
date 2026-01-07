export interface Tecnico {
  id: number | null | "";
  nome: string;
  ativo: boolean;
  telefone: string;
  dataCadastro: Date | null | string;
}
