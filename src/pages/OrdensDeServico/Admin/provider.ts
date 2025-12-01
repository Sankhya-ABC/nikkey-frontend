import { ComoEncontrado, OrdemDeServico, TipoContagem } from "./types";

export const mockOrdensDeServico: OrdemDeServico[] = [
  {
    id: 1,
    ativo: true,
    dataCadastro: "20/10/2025",
    cliente: {
      id: 1001,
      nome: "Restaurante Sabor & Arte",
    },
    tecnico: {
      id: 2001,
      nome: "Carlos Mendonça",
    },
    data: {
      data: "15/01/2024",
      horaInicio: "08:30",
      horaFinal: "10:45",
    },
    responsavel: {
      nome: "Carlos Silva",
      cargo: "Gerente de Operações",
    },
    flagPossuiVisitaPendente: false,

    flagServicoRealizado: true,
    motivoNaoRealizacao: "",

    flagEvidenciasOuFocosPragas: true,
    pragas: [
      {
        idPraga: 1,
        comoEncontrado: ComoEncontrado.INDIVIDUOS_VIVOS,
        ondeEncontrado: "Cozinha - armário de mantimentos",
        quantidade: 5,
      },
      {
        idPraga: 2,
        comoEncontrado: ComoEncontrado.FRAGMENTOS,
        ondeEncontrado: "Depósito - caixas de papelão",
        quantidade: 12,
      },
    ],

    flagRevisaoEquipamentos: true,

    iscagem: {
      flag: true,
      quantidade: 10,
      mofoDeterioracao: {
        quantidade: 2,
        identificacao: ["ISC-001", "ISC-002"],
      },
      roido: { quantidade: 1, identificacao: ["ISC-005"] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },

    placaColaArmadilhaMecanica: {
      flag: true,
      quantidade: 8,
      sujeiraDeterioracao: { quantidade: 1, identificacao: ["PLA-003"] },
      roedorAderido: { quantidade: 2, identificacao: ["PLA-001", "PLA-004"] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },

    armadilhaLuminosa: {
      flag: true,
      quantidade: 4,
      flagClienteExigeContagemInsetosPorArmadilha: true,
      tipoContagem: TipoContagem.ESPECIE,
      contagem: {
        identificacao: ["ARM-LUM-001", "ARM-LUM-002"],
        mosca: [15, 12],
        mosquito: [8, 5],
        mariposa: [3, 2],
        besouro: [2, 1],
        outros: [1, 0],
      },
    },

    armadilhaFeromonio: {
      flag: false,
      quantidade: 0,
      guachon: { quantidade: 0, identificacao: [] },
      bioSerrico: { quantidade: 0, identificacao: [] },
    },

    flagConsumoProdutos: true,
    consumo: [
      {
        idPraga: 1,
        idProduto: 301,
        lote: "LOT-2024-001",
        validade: "30/06/2025",
        idEquipamento: 401,
        quantidade: 2,
      },
    ],

    areaLocal: "Cozinha",
    naoConformidade: "Armazenamento inadequado de alimentos",
    acaoSugerida:
      "Implementar sistema de armazenamento em recipientes herméticos",

    naoConformidades: {
      flag: true,
      naoConformidades: [
        {
          areaLocal: "Depósito",
          naoConformidade: "Acúmulo de caixas de papelão",
          acaoSugerida: "Descarte adequado e limpeza periódica",
        },
      ],
    },
    observacoes: "Cliente orientado sobre práticas de higiene e armazenamento",

    flagUploadEvidencias: true,
    uploads: [],
  },
  {
    id: 2,
    ativo: true,
    dataCadastro: "20/10/2025",
    cliente: {
      id: 1002,
      nome: "Supermercado Preço Bom",
    },
    tecnico: {
      id: 2002,
      nome: "Ana Lúcia Santos",
    },
    data: {
      data: "16/01/2024",
      horaInicio: "13:05",
      horaFinal: "15:40",
    },
    responsavel: {
      nome: "Ana Oliveira",
      cargo: "Supervisora",
    },
    flagPossuiVisitaPendente: true,

    flagServicoRealizado: false,
    motivoNaoRealizacao: "Cliente não estava presente no local",

    flagEvidenciasOuFocosPragas: false,
    pragas: [],

    flagRevisaoEquipamentos: false,
    iscagem: {
      flag: false,
      quantidade: 0,
      mofoDeterioracao: { quantidade: 0, identificacao: [] },
      roido: { quantidade: 0, identificacao: [] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },
    placaColaArmadilhaMecanica: {
      flag: false,
      quantidade: 0,
      sujeiraDeterioracao: { quantidade: 0, identificacao: [] },
      roedorAderido: { quantidade: 0, identificacao: [] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },
    armadilhaLuminosa: {
      flag: false,
      quantidade: 0,
      flagClienteExigeContagemInsetosPorArmadilha: false,
      tipoContagem: "",
      contagem: [],
    },
    armadilhaFeromonio: {
      flag: false,
      quantidade: 0,
      guachon: { quantidade: 0, identificacao: [] },
      bioSerrico: { quantidade: 0, identificacao: [] },
    },

    flagConsumoProdutos: false,
    consumo: [],

    areaLocal: "",
    naoConformidade: "",
    acaoSugerida: "",

    naoConformidades: {
      flag: false,
      naoConformidades: [],
    },
    observacoes: "Serviço não realizado - reagendar visita",

    flagUploadEvidencias: false,
    uploads: [],
  },
  {
    id: 3,
    ativo: true,
    dataCadastro: "20/10/2025",
    cliente: {
      id: 1003,
      nome: "Hotel Plaza Central",
    },
    tecnico: {
      id: 2003,
      nome: "Roberto Almeida",
    },
    data: {
      data: "17/01/2024",
      horaInicio: "16:00",
      horaFinal: "17:15",
    },
    responsavel: {
      nome: "Roberto Santos",
      cargo: "Coordenador",
    },
    flagPossuiVisitaPendente: false,

    flagServicoRealizado: true,
    motivoNaoRealizacao: "",

    flagEvidenciasOuFocosPragas: true,
    pragas: [
      {
        idPraga: 3,
        comoEncontrado: ComoEncontrado.INDIVIDUOS_MORTOS,
        ondeEncontrado: "Área externa - próximo ao lixo",
        quantidade: 3,
      },
    ],

    flagRevisaoEquipamentos: true,
    iscagem: {
      flag: true,
      quantidade: 15,
      mofoDeterioracao: { quantidade: 0, identificacao: [] },
      roido: { quantidade: 0, identificacao: [] },
      obstruidoQuebradoExtraviado: {
        quantidade: 1,
        identificacao: ["ISC-012"],
      },
    },
    placaColaArmadilhaMecanica: {
      flag: false,
      quantidade: 0,
      sujeiraDeterioracao: { quantidade: 0, identificacao: [] },
      roedorAderido: { quantidade: 0, identificacao: [] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },
    armadilhaLuminosa: {
      flag: true,
      quantidade: 6,
      flagClienteExigeContagemInsetosPorArmadilha: false,
      tipoContagem: TipoContagem.TOTAL,
      contagem: [
        { quantidade: 25, identificacao: ["ARM-LUM-101"] },
        { quantidade: 18, identificacao: ["ARM-LUM-102"] },
      ],
    },
    armadilhaFeromonio: {
      flag: true,
      quantidade: 5,
      guachon: { quantidade: 2, identificacao: ["FER-GUA-001", "FER-GUA-002"] },
      bioSerrico: { quantidade: 1, identificacao: ["FER-BIO-001"] },
    },

    flagConsumoProdutos: true,
    consumo: [
      {
        idPraga: 3,
        idProduto: 302,
        lote: "LOT-2024-015",
        validade: "15/08/2025",
        idEquipamento: 402,
        quantidade: 3,
      },
    ],

    areaLocal: "Área externa",
    naoConformidade: "Lixo acumulado próximo ao prédio",
    acaoSugerida: "Aumentar frequência de coleta de lixo",

    naoConformidades: {
      flag: true,
      naoConformidades: [
        {
          areaLocal: "Estacionamento",
          naoConformidade: "Vazamento na tubulação",
          acaoSugerida: "Reparo urgente da tubulação",
        },
      ],
    },
    observacoes: "Cliente solicitou relatório detalhado para seguradora",

    flagUploadEvidencias: true,
    uploads: [],
  },
  {
    id: 4,
    ativo: false,
    dataCadastro: "20/10/2025",
    cliente: {
      id: 1004,
      nome: "Escola Municipal ABC",
    },
    tecnico: {
      id: 2004,
      nome: "Maria Fernanda Costa",
    },
    data: {
      data: "18/01/2024",
      horaInicio: "11:20",
      horaFinal: "13:20",
    },
    responsavel: {
      nome: "Maria Costa",
      cargo: "Gerente",
    },
    flagPossuiVisitaPendente: false,

    flagServicoRealizado: true,
    motivoNaoRealizacao: "",

    flagEvidenciasOuFocosPragas: false,
    pragas: [],

    flagRevisaoEquipamentos: true,
    iscagem: {
      flag: true,
      quantidade: 12,
      mofoDeterioracao: { quantidade: 0, identificacao: [] },
      roido: { quantidade: 0, identificacao: [] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },
    placaColaArmadilhaMecanica: {
      flag: true,
      quantidade: 10,
      sujeiraDeterioracao: { quantidade: 0, identificacao: [] },
      roedorAderido: { quantidade: 0, identificacao: [] },
      obstruidoQuebradoExtraviado: { quantidade: 0, identificacao: [] },
    },
    armadilhaLuminosa: {
      flag: false,
      quantidade: 0,
      flagClienteExigeContagemInsetosPorArmadilha: false,
      tipoContagem: "",
      contagem: [],
    },
    armadilhaFeromonio: {
      flag: false,
      quantidade: 0,
      guachon: { quantidade: 0, identificacao: [] },
      bioSerrico: { quantidade: 0, identificacao: [] },
    },

    flagConsumoProdutos: false,
    consumo: [],

    areaLocal: "",
    naoConformidade: "",
    acaoSugerida: "",

    naoConformidades: {
      flag: false,
      naoConformidades: [],
    },
    observacoes: "Situação sob controle, sem ocorrências significativas",

    flagUploadEvidencias: false,
    uploads: [],
  },
  {
    id: 5,
    ativo: true,
    dataCadastro: "20/10/2025",
    cliente: {
      id: 1005,
      nome: "Indústria Alimentícia NutriSafe",
    },
    tecnico: {
      id: 2001,
      nome: "Carlos Mendonça",
    },
    data: {
      data: "19/01/2024",
      horaInicio: "10:50",
      horaFinal: "14:35",
    },
    responsavel: {
      nome: "João Pereira",
      cargo: "Diretor",
    },
    flagPossuiVisitaPendente: true,

    flagServicoRealizado: true,
    motivoNaoRealizacao: "",

    flagEvidenciasOuFocosPragas: true,
    pragas: [
      {
        idPraga: 4,
        comoEncontrado: ComoEncontrado.INDIVIDUOS_VIVOS,
        ondeEncontrado: "Sala de arquivos - prateleiras",
        quantidade: 8,
      },
      {
        idPraga: 5,
        comoEncontrado: ComoEncontrado.FRAGMENTOS,
        ondeEncontrado: "Copa - armário sob pia",
        quantidade: 6,
      },
    ],

    flagRevisaoEquipamentos: true,
    iscagem: {
      flag: true,
      quantidade: 20,
      mofoDeterioracao: {
        quantidade: 3,
        identificacao: ["ISC-101", "ISC-102", "ISC-103"],
      },
      roido: { quantidade: 2, identificacao: ["ISC-104", "ISC-105"] },
      obstruidoQuebradoExtraviado: {
        quantidade: 1,
        identificacao: ["ISC-106"],
      },
    },
    placaColaArmadilhaMecanica: {
      flag: true,
      quantidade: 15,
      sujeiraDeterioracao: {
        quantidade: 2,
        identificacao: ["PLA-201", "PLA-202"],
      },
      roedorAderido: {
        quantidade: 4,
        identificacao: ["PLA-203", "PLA-204", "PLA-205", "PLA-206"],
      },
      obstruidoQuebradoExtraviado: {
        quantidade: 1,
        identificacao: ["PLA-207"],
      },
    },
    armadilhaLuminosa: {
      flag: true,
      quantidade: 8,
      flagClienteExigeContagemInsetosPorArmadilha: true,
      tipoContagem: TipoContagem.ESPECIE,
      contagem: {
        identificacao: ["ARM-LUM-301", "ARM-LUM-302", "ARM-LUM-303"],
        mosca: [22, 18, 25],
        mosquito: [12, 8, 15],
        mariposa: [5, 3, 8],
        besouro: [3, 2, 4],
        outros: [2, 1, 3],
      },
    },
    armadilhaFeromonio: {
      flag: true,
      quantidade: 8,
      guachon: {
        quantidade: 3,
        identificacao: ["FER-GUA-101", "FER-GUA-102", "FER-GUA-103"],
      },
      bioSerrico: {
        quantidade: 2,
        identificacao: ["FER-BIO-101", "FER-BIO-102"],
      },
    },

    flagConsumoProdutos: true,
    consumo: [
      {
        idPraga: 4,
        idProduto: 303,
        lote: "LOT-2024-028",
        validade: "20/09/2025",
        idEquipamento: 403,
        quantidade: 5,
      },
      {
        idPraga: 5,
        idProduto: 304,
        lote: "LOT-2024-029",
        validade: "15/10/2025",
        idEquipamento: 404,
        quantidade: 3,
      },
    ],

    areaLocal: "Sala de arquivos",
    naoConformidade: "Umidade elevada e má ventilação",
    acaoSugerida: "Instalar desumidificador e melhorar ventilação",

    naoConformidades: {
      flag: true,
      naoConformidades: [
        {
          areaLocal: "Copa",
          naoConformidade: "Vazamento na tubulação de água",
          acaoSugerida: "Reparar vazamento imediatamente",
        },
        {
          areaLocal: "Área externa",
          naoConformidade: "Vegetação encostando no prédio",
          acaoSugerida: "Podar vegetação regularmente",
        },
      ],
    },
    observacoes:
      "Cliente muito satisfeito com o serviço. Agendada visita de acompanhamento em 30 dias.",

    flagUploadEvidencias: true,
    uploads: [],
  },
];
