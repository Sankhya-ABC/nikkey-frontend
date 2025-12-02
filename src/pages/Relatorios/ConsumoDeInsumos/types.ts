export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface ConsumoDeInsumos {
  periodo: Date | null | string;
  quantidade: number;
}
