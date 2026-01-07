import {
  //  Add, Edit,
  Visibility,
} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import {
  // Button, Switch
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Layout } from "@/components/Template/Layout";
import { useAlert } from "@/hooks/useAlert";
import { useAuth } from "@/hooks/useAuth";
import { Cliente } from "@/services/Clientes/types";
import { CRUDType, ErrorMessage } from "@/services/types";
import { usuarioService } from "@/services/Usuarios";

import { ROUTES } from "../../routes";

import { ConsultaCliente } from "./ConsultaCliente";
import { FormCRUDCliente } from "./FormCRUDCliente";
// import { FormStatus } from "./FormStatus";

export const Clientes = () => {
  // hooks
  const { impersonate } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // useStates
  // -- data
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  // const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDCliente, setOpenFormCRUDCliente] = useState(false);

  // -- table
  const [resetConsulta, setResetConsulta] = useState<boolean>(false);

  // handlers
  // -- crud modals
  const handleOpenFormCRUDCliente = (
    crudType: CRUDType,
    cliente?: Cliente | null,
  ) => {
    setFormType(crudType);
    setSelectedCliente(cliente || null);
    setOpenFormCRUDCliente(true);
  };

  const handleCloseFormCRUDCliente = () => {
    setSelectedCliente(null);
    setOpenFormCRUDCliente(false);
  };

  const persistCallback = async () => {
    setResetConsulta(true);
  };

  // -- status modal
  // const handleOpenFormStatus = (cliente?: Cliente | null) => {
  //   setSelectedCliente(cliente || null);
  //   setOpenFormStatus(true);
  // };

  // const handleCloseFormStatus = () => {
  //   setSelectedCliente(null);
  //   setOpenFormStatus(false);
  // };

  // -- impersonate
  const handleAcessarComo = async (id: number) => {
    try {
      const resp = await usuarioService.buscarUsuarioPorId(id);
      impersonate(resp);
      navigate(ROUTES.HOME);
    } catch (error) {
      const err = error as ErrorMessage;
      showAlert({
        title: "Erro",
        children: err?.message?.toString(),
        severity: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Layout title="Clientes">
      {/* <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenFormCRUDCliente(CRUDType.CREATE, null)}
        >
          Cadastrar
        </Button>
      </Grid> */}

      <Grid size={{ xs: 12 }}>
        <ConsultaCliente
          resetConsulta={resetConsulta}
          setResetConsulta={setResetConsulta}
          actions={[
            {
              tooltip: "Acessar como",
              element: <LoginIcon />,
              onClick: (cliente: Cliente) =>
                handleAcessarComo(cliente?.id! as number),
            },
            {
              tooltip: "Visualizar",
              element: <Visibility />,
              onClick: (cliente: Cliente) =>
                handleOpenFormCRUDCliente(CRUDType.READ, cliente),
            },
            // {
            //   tooltip: "Editar",
            //   element: <Edit />,
            //   onClick: (cliente: Cliente) =>
            //     handleOpenFormCRUDCliente(CRUDType.UPDATE, cliente),
            // },
            // {
            //   tooltip: (cliente: Cliente) =>
            //     cliente?.ativo ? "Desativar" : "Ativar",
            //   element: (cliente: Cliente) => (
            //     <Switch
            //       checked={cliente?.ativo}
            //       onChange={() => handleOpenFormStatus(cliente)}
            //       color={cliente?.ativo ? "success" : "default"}
            //     />
            //   ),
            // },
          ]}
        />
      </Grid>

      <FormCRUDCliente
        {...{
          open: openFormCRUDCliente,
          handleClose: handleCloseFormCRUDCliente,
          selected: selectedCliente,
          formType,
          persistCallback,
        }}
      />

      {/* <FormStatus
        {...{
          open: openFormStatus,
          handleClose: handleCloseFormStatus,
          selected: selectedCliente,
          persistCallback,
        }}
      /> */}
    </Layout>
  );
};
