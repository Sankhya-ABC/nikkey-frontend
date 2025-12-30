import { CRUDType } from "../types";

export enum ComoEncontrado {
  INDIVIDUOS_VIVOS = "Indivíduos Vivos",
  INDIVIDUOS_MORTOS = "Indivíduos Mortos",
  FRAGMENTOS = "Fragmentos",
}

export interface Praga {
  idPraga: number | "";
  comoEncontrado: ComoEncontrado | "";
  ondeEncontrado: string;
  quantidade: number | "";
}

export interface QuantidadeIdentificacao {
  quantidade: number | "";
  identificacao: string[];
}

export enum TipoContagem {
  TOTAL = "Total",
  ESPECIE = "Espécie",
}

export interface ContagemEspecie {
  identificacao: string[];
  mosca: number[];
  mosquito: number[];
  mariposa: number[];
  besouro: number[];
  outros: number[];
}

export interface Consumo {
  idPraga: number | "";
  idProduto: number | "";
  lote: string;
  validade: Date | null | string;
  idEquipamento: number | "";
  quantidade: number | "";
}

export interface InformacoesGerais {
  id: number | null;
  ativo: boolean;
  dataCadastro: Date | null | string;
  cliente: {
    id: number | "";
    nome: string;
  };
  tecnico: {
    id: number | "";
    nome: string;
  };
  data: {
    data: Date | null | string;
    horaInicio: Date | null | string;
    horaFinal: Date | null | string;
  };
  responsavel: {
    nome: string;
    cargo: string;
  };
  flagPossuiVisitaPendente: boolean;
}

export interface InformacoesBasicasServico {
  flagServicoRealizado: boolean;
  motivoNaoRealizacao: string;
}

export interface PragasEncontradas {
  flagEvidenciasOuFocosPragas: boolean;
  pragas: Praga[];
}

export interface Equipamentos {
  flagRevisaoEquipamentos: boolean;

  iscagem: {
    flag: boolean;
    quantidade: number | "";
    mofoDeterioracao: QuantidadeIdentificacao;
    roido: QuantidadeIdentificacao;
    obstruidoQuebradoExtraviado: QuantidadeIdentificacao;
  };

  placaColaArmadilhaMecanica: {
    flag: boolean;
    quantidade: number | "";
    sujeiraDeterioracao: QuantidadeIdentificacao;
    roedorAderido: QuantidadeIdentificacao;
    obstruidoQuebradoExtraviado: QuantidadeIdentificacao;
  };

  armadilhaLuminosa: {
    flag: boolean;
    quantidade: number | "";
    flagClienteExigeContagemInsetosPorArmadilha: boolean;
    tipoContagem: TipoContagem | "";
    contagem: ContagemEspecie | QuantidadeIdentificacao[];
  };

  armadilhaFeromonio: {
    flag: boolean;
    quantidade: number | "";
    guachon: QuantidadeIdentificacao;
    bioSerrico: QuantidadeIdentificacao;
  };
}

export interface ConsumoProdutos {
  flagConsumoProdutos: boolean;
  consumo: Consumo[];
}

export interface NaoConformidade {
  areaLocal: string;
  naoConformidade: string;
  acaoSugerida: string;
}

export interface InformacoesAdicionais {
  naoConformidades: {
    flag: boolean;
    naoConformidades: NaoConformidade[];
  };
  observacoes: string;
}

export interface UploadEvidencias {
  flagUploadEvidencias: boolean;
  uploads: File[];
}

export interface FrontendHelper {
  formType?: CRUDType;
}

export type OrdemDeServico = InformacoesGerais &
  InformacoesBasicasServico &
  PragasEncontradas &
  Equipamentos &
  ConsumoProdutos &
  NaoConformidade &
  InformacoesAdicionais &
  UploadEvidencias &
  FrontendHelper;
