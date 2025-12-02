export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface ConsumoDeProdutos {
  data: Date | null | string;
  inseticidadeLiquido: number;
  inseticidadeSolido: number;
  rodenticida: number;
}
