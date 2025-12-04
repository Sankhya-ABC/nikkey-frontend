export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface PlacaDeColaArmadilhaMecanica {
  periodo: Date | null | string;
  quantidade: number;
}
