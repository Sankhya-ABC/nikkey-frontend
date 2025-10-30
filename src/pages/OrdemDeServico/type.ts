export interface OrdemDeServico {
  cliente: string;
  tecnico: string;
  dataVisita: Date | null;
  visitasPendentes: string;
  horaInicio: Date | null;
  horaFim: Date | null;
  responsavel: string;
  cargoResponsavel: string;
  servicoRealizado: boolean;
  motivoNaoRealizacao: string;
  evidenciasPragas: boolean;
  pragas: string | number;
  revisaoEquipamentos: boolean;
  oQueFoiVisualizado: string | number;
  quantidade: string;
  areaEncontrado: string;
  consumoProdutos: boolean;
  naoConformidades: boolean;
  uploadEvidencias: boolean;
  observacoes: string;
  revisaoIscagem: boolean;
}
