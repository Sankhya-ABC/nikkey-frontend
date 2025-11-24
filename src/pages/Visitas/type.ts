export enum View {
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}

export interface VisitaForm {
  id: string | null;
  empresa: string;
  tecnico: string;
  dataVisita: Date;
  horaInicial: string;
  horaFinal: string;
  descricao: string;
}

export enum ModalMode {
  LIST = "LIST",
  CRUD = "CRUD",
}
