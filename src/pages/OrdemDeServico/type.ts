export enum ComoEncontrado {
  INDIVIDUOS_VIVOS = "INDIVIDUOS_VIVOS",
  INDIVIDUOS_MORTOS = "INDIVIDUOS_MORTOS",
  FRAGMENTOS = "FRAGMENTOS",
}

export interface Praga {
  idPraga: number;
  comoEncontrado: ComoEncontrado;
  ondeEncontrado: string;
  quantidade: string;
}

export interface QuantidadeIdentificacao {
  quantidade: number | string;
  identificacao: string[];
}

export enum TipoContagem {
  TOTAL = "TOTAL",
  ESPECIE = "ESPECIE",
}

export interface Consumo {
  idPraga: number;
  idProduto: number;
  lote: string;
  validade: Date | null;
  idEquipamento: number;
  quantidade: number | string;
}

// seções da tela
export interface InformacoesGerais {
  idCliente: number;
  idTecnico: number;
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
    quantidade: number | string;
    mofoDeterioracao: QuantidadeIdentificacao;
    roido: QuantidadeIdentificacao;
    obstruidoQuebradoExtraviado: QuantidadeIdentificacao;
  };

  placaColaArmadilhaMecanica: {
    flag: boolean;
    quantidade: number | string;
    sujeiraDeterioracao: QuantidadeIdentificacao;
    roedorAderido: QuantidadeIdentificacao;
    obstruidoQuebradoExtraviado: QuantidadeIdentificacao;
  };

  armadilhaLuminosa: {
    flag: boolean;
    flagClienteExigeContagemInsetosPorArmadilha: boolean;
    tipoContagem: TipoContagem;
    contagem:
      | (QuantidadeIdentificacao & { idPraga: number }[])
      | QuantidadeIdentificacao[];
  };

  armadilhaFeromonio: {
    flag: boolean;
    quantidade: number | string;
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
