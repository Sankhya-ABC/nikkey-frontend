import {
  //  Add, Edit,
  Visibility,
} from "@mui/icons-material";
import PrintIcon from "@mui/icons-material/Print";
import {
  // Button, Switch
  Grid,
} from "@mui/material";
import { useState } from "react";

import { Layout } from "@/components/Template/Layout";
import { useAlert } from "@/hooks/useAlert";
import { ordemDeServicoService } from "@/services/OrdensDeServico";
import { OrdemDeServico } from "@/services/OrdensDeServico/types";
import { CRUDType, ErrorMessage } from "@/services/types";

import { ConsultaOrdemDeServico } from "./ConsultaOrdemDeServico";
import { FormCRUDOrdemDeServico } from "./FormCRUDOrdemDeServico";
// import { FormStatus } from "./FormStatus";

export const OrdensDeServicoAdmin = () => {
  // hooks
  const { showAlert } = useAlert();

  // useStates
  // -- data
  const [selectedOrdemDeServico, setSelectedOrdemDeServico] =
    useState<OrdemDeServico | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  // const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDOrdemDeServico, setOpenFormCRUDOrdemDeServico] =
    useState(false);

  // -- table
  const [resetConsulta, setResetConsulta] = useState<boolean>(false);

  // handlers
  // -- crud modals
  const handleOpenFormCRUDOrdemDeServico = (
    crudType: CRUDType,
    ordemDeServico?: OrdemDeServico | null,
  ) => {
    setFormType(crudType);
    setSelectedOrdemDeServico(ordemDeServico || null);
    setOpenFormCRUDOrdemDeServico(true);
  };

  const handleCloseFormCRUDOrdemDeServico = () => {
    setSelectedOrdemDeServico(null);
    setOpenFormCRUDOrdemDeServico(false);
  };

  const persistCallback = async () => {
    setResetConsulta(true);
  };

  // -- status modal
  // const handleOpenFormStatus = (ordemDeServico?: OrdemDeServico | null) => {
  //   setSelectedOrdemDeServico(ordemDeServico || null);
  //   setOpenFormStatus(true);
  // };

  // const handleCloseFormStatus = () => {
  //   setSelectedOrdemDeServico(null);
  //   setOpenFormStatus(false);
  // };

  // requests
  const handleImprimir = async (id: number) => {
    try {
      await ordemDeServicoService.imprimirOrdemDeServicoPorId(id);
    } catch (error) {
      const err = error as ErrorMessage;
      showAlert({
        title: "Erro",
        children: err?.message,
        severity: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Layout title="Ordens de Serviço">
      {/* <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenFormCRUDOrdemDeServico(CRUDType.CREATE, null)}
        >
          Cadastrar
        </Button>
      </Grid> */}

      <Grid size={{ xs: 12 }}>
        <ConsultaOrdemDeServico
          resetConsulta={resetConsulta}
          setResetConsulta={setResetConsulta}
          actions={[
            {
              tooltip: "Visualizar",
              element: <Visibility />,
              onClick: (ordemDeServico: OrdemDeServico) =>
                handleOpenFormCRUDOrdemDeServico(CRUDType.READ, ordemDeServico),
            },
            // {
            //   tooltip: "Editar",
            //   element: <Edit />,
            //   onClick: (ordemDeServico: OrdemDeServico) =>
            //     handleOpenFormCRUDOrdemDeServico(CRUDType.UPDATE, ordemDeServico),
            // },
            {
              tooltip: "Imprimir",
              element: <PrintIcon />,
              onClick: (ordemDeServico: OrdemDeServico) =>
                handleImprimir(ordemDeServico?.id! as number),
            },
            // {
            //   tooltip: (ordemDeServico: OrdemDeServico) =>
            //     ordemDeServico?.ativo ? "Desativar" : "Ativar",
            //   element: (ordemDeServico: OrdemDeServico) => (
            //     <Switch
            //       checked={ordemDeServico?.ativo}
            //       onChange={() => handleOpenFormStatus(ordemDeServico)}
            //       color={ordemDeServico?.ativo ? "success" : "default"}
            //     />
            //   ),
            // },
          ]}
        />
      </Grid>

      <FormCRUDOrdemDeServico
        {...{
          open: openFormCRUDOrdemDeServico,
          handleClose: handleCloseFormCRUDOrdemDeServico,
          selected: selectedOrdemDeServico,
          formType,
          persistCallback,
        }}
      />

      {/* <FormStatus
        {...{
          open: openFormStatus,
          handleClose: handleCloseFormStatus,
          selected: selectedOrdemDeServico,
          persistCallback,
        }}
      /> */}
    </Layout>
  );
};
