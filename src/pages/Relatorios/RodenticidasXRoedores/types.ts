export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface RodenticidasXRoedores {
  periodo: Date | null | string;
  rodenticida: number;
  mortos: number;
}
