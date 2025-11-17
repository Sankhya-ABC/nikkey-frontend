export interface Usuario {
  id: number | null;
  nome: string;
  email: string;
  departamento: string;
  perfil: number | "";
  telefone: string;
  senha: string;
  confirmarSenha: string;
  ativo: boolean;
  dataCadastro: Date | null | string;
}
