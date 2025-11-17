import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ConsumoProdutos } from "./ConsumoProdutos";
import { Equipamentos } from "./Equipamentos";
import { InformacoesAdicionais } from "./InformacoesAdicionais";
import { InformacoesBasicasServico } from "./InformacoesBasicasServico";
import { InformacoesGerais } from "./InformacoesGerais";
import { PragasEncontradas } from "./PragasEncontradas";
import { UploadEvidencias } from "./UploadEvidencias";
import { CRUDType } from "../../../types";
import { OrdemDeServico } from "../types";

interface FormCRUDOrdemDeServicoProps {
  open: boolean;
  handleClose: () => void;
  formType: CRUDType;
  selected: OrdemDeServico | null;
}

const defaultValues: OrdemDeServico = {
  id: null,
  ativo: true,
  dataCadastro: null,
  cliente: {
    id: "",
    nome: "",
  },
  tecnico: {
    id: "",
    nome: "",
  },
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
    quantidade: "",
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

export const FormCRUDOrdemDeServico: React.FC<FormCRUDOrdemDeServicoProps> = ({
  open,
  handleClose,
  formType,
  selected,
}) => {
  const methods = useForm<OrdemDeServico>({ defaultValues });
  const { reset, watch } = methods;

  const flagServicoRealizado = watch("flagServicoRealizado");

  useEffect(() => {
    if (formType === CRUDType.UPDATE || formType === CRUDType.READ) {
      reset(selected || defaultValues);
    }
  }, [formType, selected]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        {formType}
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

            {flagServicoRealizado && (
              <>
                <Grid item size={{ xs: 12 }}>
                  <PragasEncontradas />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <Equipamentos />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <ConsumoProdutos />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <InformacoesAdicionais />
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <UploadEvidencias />
                </Grid>
              </>
            )}
          </Grid>
        </FormProvider>
      </DialogContent>
      {formType !== CRUDType.READ && (
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            {formType === CRUDType.CREATE && "Cadastrar"}
            {formType === CRUDType.UPDATE && "Editar"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
