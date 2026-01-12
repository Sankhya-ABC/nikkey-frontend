import { Add, Edit, Visibility } from "@mui/icons-material";
import { Button, Grid, Switch } from "@mui/material";
import { useState } from "react";

import { Layout } from "@/components/Template/Layout";
import { CRUDType } from "@/services/types";
import { Usuario } from "@/services/Usuario/types";

import { ConsultaUsuario } from "./ConsultaUsuario";
import { FormCRUDUsuario } from "./FormCRUDUsuario";
import { FormStatus } from "./FormStatus";

export const Usuarios = () => {
  // useStates
  // -- data
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDUsuario, setOpenFormCRUDUsuario] = useState(false);

  // -- table
  const [resetConsulta, setResetConsulta] = useState<boolean>(false);

  // handlers
  // -- crud modals
  const handleOpenFormCRUDUsuario = (
    crudType: CRUDType,
    usuario?: Usuario | null,
  ) => {
    setFormType(crudType);
    setSelectedUsuario(usuario || null);
    setOpenFormCRUDUsuario(true);
  };

  const handleCloseFormCRUDUsuario = () => {
    setSelectedUsuario(null);
    setOpenFormCRUDUsuario(false);
  };

  const persistCallback = async () => {
    setResetConsulta(true);
  };

  // -- status modal
  const handleOpenFormStatus = (usuario?: Usuario | null) => {
    setSelectedUsuario(usuario || null);
    setOpenFormStatus(true);
  };

  const handleCloseFormStatus = () => {
    setSelectedUsuario(null);
    setOpenFormStatus(false);
  };

  return (
    <Layout title="Usuários">
      <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenFormCRUDUsuario(CRUDType.CREATE, null)}
        >
          Cadastrar
        </Button>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ConsultaUsuario
          resetConsulta={resetConsulta}
          setResetConsulta={setResetConsulta}
          actions={[
            {
              tooltip: "Visualizar",
              element: <Visibility />,
              onClick: (usuario: Usuario) =>
                handleOpenFormCRUDUsuario(CRUDType.READ, usuario),
            },
            {
              tooltip: "Editar",
              element: <Edit />,
              onClick: (usuario: Usuario) =>
                handleOpenFormCRUDUsuario(CRUDType.UPDATE, usuario),
            },
            {
              tooltip: (usuario: Usuario) =>
                usuario?.ativo ? "Desativar" : "Ativar",
              element: (usuario: Usuario) => (
                <Switch
                  checked={usuario?.ativo}
                  onChange={() => handleOpenFormStatus(usuario)}
                  color={usuario?.ativo ? "success" : "default"}
                />
              ),
            },
          ]}
        />
      </Grid>

      <FormCRUDUsuario
        {...{
          open: openFormCRUDUsuario,
          handleClose: handleCloseFormCRUDUsuario,
          selected: selectedUsuario,
          formType,
          persistCallback,
        }}
      />

      <FormStatus
        {...{
          open: openFormStatus,
          handleClose: handleCloseFormStatus,
          selected: selectedUsuario,
          persistCallback,
        }}
      />
    </Layout>
  );
};
