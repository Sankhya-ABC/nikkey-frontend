export interface Tecnico {
  id: number | null | "";
  nome: string;
  cpfCnpj: string;
  telefone: string;
  ativo: boolean;
  dataCadastro: Date | null | string;
}
