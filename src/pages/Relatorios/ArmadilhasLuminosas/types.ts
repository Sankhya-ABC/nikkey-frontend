export interface FormRelatorio {
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

export interface ArmadilhasLuminosas {
  periodo: Date | null | string;
  mosca: number;
  mosquito: number;
  mariposa: number;
  besouro: number;
  outros: number;
  naoEspecificado: number;
}
