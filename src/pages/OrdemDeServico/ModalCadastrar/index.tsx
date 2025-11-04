import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OrdemServico } from "../type";
import { ConsumoProdutos } from "./ConsumoProdutos";
import { InformacoesBasicasServico } from "./InformacoesBasicasServico";
import { InformacoesGerais } from "./InformacoesGerais";
import { InformaçõesAdicionais } from "./InformaçõesAdicionais";
import { PragasEncontradas } from "./PragasEncontradas";
import { UploadEvidencias } from "./UploadEvidencias";

const defaultValues: OrdemServico = {
  idCliente: "",
  idTecnico: "",
  data: {
    data: null,
    horaInicio: null,
    horaFinal: null,
  },
  responsavel: {
    nome: "",
    cargo: "",
  },
  flagPossuiVisitaPendente: false,

  flagServicoRealizado: false,
  motivoNaoRealizacao: "",

  flagEvidenciasOuFocosPragas: false,
  pragas: [],

  flagRevisaoEquipamentos: false,

  iscagem: {
    flag: false,
    quantidade: "",
    mofoDeterioracao: {
      quantidade: "",
      identificacao: [],
    },
    roido: {
      quantidade: "",
      identificacao: [],
    },
    obstruidoQuebradoExtraviado: {
      quantidade: "",
      identificacao: [],
    },
  },

  placaColaArmadilhaMecanica: {
    flag: false,
    quantidade: "",
    sujeiraDeterioracao: {
      quantidade: "",
      identificacao: [],
    },
    roedorAderido: {
      quantidade: "",
      identificacao: [],
    },
    obstruidoQuebradoExtraviado: {
      quantidade: "",
      identificacao: [],
    },
  },

  armadilhaLuminosa: {
    flag: false,
    flagClienteExigeContagemInsetosPorArmadilha: false,
    tipoContagem: "",
    contagem: [],
  },

  armadilhaFeromonio: {
    flag: false,
    quantidade: "",
    guachon: {
      quantidade: "",
      identificacao: [],
    },
    bioSerrico: {
      quantidade: "",
      identificacao: [],
    },
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
  observacoes: "",

  flagUploadEvidencias: false,
  uploads: [],
};

interface ModalCadastrarProps {
  openCreateDialog: any;
  handleCloseCreateDialog: any;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({
  openCreateDialog,
  handleCloseCreateDialog,
}) => {
  const methods = useForm<OrdemServico>({
    defaultValues,
  });

  return (
    <Dialog
      open={openCreateDialog}
      onClose={handleCloseCreateDialog}
      maxWidth="md"
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Cadastrar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12 }}>
              <InformacoesGerais />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <InformacoesBasicasServico />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <PragasEncontradas />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <ConsumoProdutos />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <InformaçõesAdicionais />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <UploadEvidencias />
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCreateDialog}>Cancelar</Button>
        <Button variant="contained" onClick={handleCloseCreateDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
