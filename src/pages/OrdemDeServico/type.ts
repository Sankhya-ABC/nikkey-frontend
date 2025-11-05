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
  validade: Date | null;
  idEquipamento: number | "";
  quantidade: number | "";
}

export interface InformacoesGerais {
  idCliente: number | "";
  idTecnico: number | "";
  data: {
    data: Date | null;
    horaInicio: Date | null;
    horaFinal: Date | null;
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

export type OrdemServico = InformacoesGerais &
  InformacoesBasicasServico &
  PragasEncontradas &
  Equipamentos &
  ConsumoProdutos &
  NaoConformidade &
  InformacoesAdicionais &
  UploadEvidencias;
