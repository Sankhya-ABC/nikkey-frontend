export interface Cliente {
  id: number | null;
  razaoSocial: string;
  nomeFantasia: string;
  cnpjCpf: string;
  validadeCertificado: number | "";
  tipoAtividade: string;
  possuiContrato: boolean;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: number | "";
  cidade: string;
  cep: string;
  contato: string;
  telefone: string;
  funcao: string;
  fax: string;
  email: string;
  observacoes: string;
  nomeAcesso: string;
  emailAcesso: string;
  departamento: string;
  senha: string;
  confirmarSenha: string;
  ativo: boolean;
  dataCadastro: Date | null | string;
}
