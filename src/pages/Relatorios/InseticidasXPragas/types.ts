export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface InseticidasXPragas {
  periodo: Date | null | string;
  pragasEncontradas: number;
  consumo: number;
}
