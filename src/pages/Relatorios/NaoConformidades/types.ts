export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface NaoConformidades {
  OS: number;
  data: Date | null | string;
  areaELocal: string;
  naoConformidade: string;
  acaoSugerida: string;
}
