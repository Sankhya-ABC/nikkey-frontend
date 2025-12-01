import { CronogramaDeVisitas, Status } from "./types";

export const mockCronogramasDeVisitas: CronogramaDeVisitas[] = [
  {
    id: 1,
    status: Status.PENDENTE,
    dataHora: "2024-01-15T09:00:00.000Z",
    tecnico: { id: 1, nome: "Carlos Silva", telefone: "(11) 99999-1111" },
  },
  {
    id: 3,
    status: Status.CANCELADO,
    dataHora: "2024-01-13T10:15:00.000Z",
    tecnico: {
      id: 3,
      nome: "Roberto Almeida",
      telefone: "(11) 99999-3333",
    },
  },
  {
    id: 5,
    status: Status.PENDENTE,
    dataHora: "2024-01-16T13:45:00.000Z",
    tecnico: {
      id: 5,
      nome: "Marcos Oliveira",
      telefone: "(11) 99999-5555",
    },
  },
  {
    id: 6,
    status: Status.REALIZADO,
    dataHora: "2024-01-12T16:00:00.000Z",
    tecnico: { id: 1, nome: "Carlos Silva", telefone: "(11) 99999-1111" },
  },
  {
    id: 8,
    status: Status.PENDENTE,
    dataHora: "2024-01-17T15:30:00.000Z",
    tecnico: {
      id: 3,
      nome: "Roberto Almeida",
      telefone: "(11) 99999-3333",
    },
  },
  {
    id: 9,
    status: Status.CANCELADO,
    dataHora: "2024-01-10T10:00:00.000Z",
    tecnico: {
      id: 4,
      nome: "Fernanda Costa",
      telefone: "(11) 99999-4444",
    },
  },
  {
    id: 10,
    status: Status.PENDENTE,
    dataHora: "2024-01-18T09:15:00.000Z",
    tecnico: {
      id: 5,
      nome: "Marcos Oliveira",
      telefone: "(11) 99999-5555",
    },
  },
  {
    id: 11,
    status: Status.REALIZADO,
    dataHora: "2024-01-09T14:00:00.000Z",
    tecnico: { id: 1, nome: "Carlos Silva", telefone: "(11) 99999-1111" },
  },
  {
    id: 13,
    status: Status.REALIZADO,
    dataHora: "2024-01-08T13:15:00.000Z",
    tecnico: {
      id: 3,
      nome: "Roberto Almeida",
      telefone: "(11) 99999-3333",
    },
  },
  {
    id: 15,
    status: Status.CANCELADO,
    dataHora: "2024-01-07T09:45:00.000Z",
    tecnico: {
      id: 5,
      nome: "Marcos Oliveira",
      telefone: "(11) 99999-5555",
    },
  },
  {
    id: 16,
    status: Status.PENDENTE,
    dataHora: "2024-01-21T10:30:00.000Z",
    tecnico: { id: 1, nome: "Carlos Silva", telefone: "(11) 99999-1111" },
  },
  {
    id: 18,
    status: Status.PENDENTE,
    dataHora: "2024-01-22T14:15:00.000Z",
    tecnico: {
      id: 3,
      nome: "Roberto Almeida",
      telefone: "(11) 99999-3333",
    },
  },
  {
    id: 20,
    status: Status.REALIZADO,
    dataHora: "2024-01-05T12:00:00.000Z",
    tecnico: {
      id: null,
      nome: "Técnico Indefinido",
      telefone: "(11) 99999-0000",
    },
  },
];
