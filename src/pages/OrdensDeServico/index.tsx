import { Add, Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { FormCRUDOrdemDeServico } from "./FormCRUDOrdemDeServico";
import { FormStatus } from "./FormStatus";
import { mockOrdensDeServico } from "./provider";
import { TableOrdensDeServico } from "./TableOrdensDeServico";
import { OrdemDeServico } from "./types";
import { CRUDType } from "../../services/types";
import { useForm } from "react-hook-form";
import { TextField } from "../../components/Form/Textfield";

interface OrdemDeServicoSearch {
  search: string;
}

const defaultValues: OrdemDeServicoSearch = {
  search: "",
};

export const OrdensDeServico = () => {
  // hooks
  const { control, watch } = useForm<OrdemDeServicoSearch>({ defaultValues });

  // useStates
  // -- data
  const [ordensDeServico, setOrdensDeServico] = useState(mockOrdensDeServico);
  const [filteredOrdensDeServico, setFilteredOrdensDeServico] =
    useState(mockOrdensDeServico);
  const [selectedOrdemDeServico, setSelectedOrdemDeServico] =
    useState<OrdemDeServico | null>(null);

  // -- crud type
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);

  // -- modals
  const [openFormStatus, setOpenFormStatus] = useState(false);
  const [openFormCRUDOrdemDeServico, setOpenFormCRUDOrdemDeServico] =
    useState(false);

  // -- search
  const [loading, setLoading] = useState(true);
  const search = watch("search");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedOrdensDeServico = filteredOrdensDeServico.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // handlers

  // -- table
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

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

  // -- status modal
  const handleOpenFormStatus = (ordemDeServico?: OrdemDeServico | null) => {
    setSelectedOrdemDeServico(ordemDeServico || null);
    setOpenFormStatus(true);
  };

  const handleCloseFormStatus = () => {
    setSelectedOrdemDeServico(null);
    setOpenFormStatus(false);
  };

  const handleToggleOrdemDeServicoStatus = () => {
    if (selectedOrdemDeServico) {
      const updatedOrdensDeServico = ordensDeServico?.map((ordemDeServico) =>
        ordemDeServico?.id === selectedOrdemDeServico.id
          ? {
              ...ordemDeServico,
              ativo: !ordemDeServico?.ativo,
            }
          : ordemDeServico,
      );
      setOrdensDeServico(updatedOrdensDeServico);
      handleCloseFormStatus();
    }
  };

  // useEffects
  useEffect(() => {
    const filtered = ordensDeServico.filter(
      (ordemDeServico) =>
        ordemDeServico?.cliente?.nome
          ?.toLowerCase()
          ?.includes(search?.toLowerCase()) ||
        ordemDeServico?.tecnico?.nome
          ?.toLowerCase()
          ?.includes(search?.toLowerCase()),
    );
    setFilteredOrdensDeServico(filtered);
    setPage(0);
  }, [search, ordensDeServico]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Ordens de Serviço">
        <Grid
          item
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              handleOpenFormCRUDOrdemDeServico(CRUDType.CREATE, null)
            }
          >
            Cadastrar
          </Button>
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <TextField
            control={control}
            name="search"
            TextFieldProps={{
              InputProps: {
                placeholder: "Pesquisar por cliente ou técnico...",
                endAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <TableOrdensDeServico
            {...{
              paginatedList: paginatedOrdensDeServico,
              handleOpenFormCRUD: handleOpenFormCRUDOrdemDeServico,
              handleOpenFormStatus,
              filteredList: filteredOrdensDeServico,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>

        <FormCRUDOrdemDeServico
          {...{
            open: openFormCRUDOrdemDeServico,
            handleClose: handleCloseFormCRUDOrdemDeServico,
            selected: selectedOrdemDeServico,
            formType,
          }}
        />

        <FormStatus
          {...{
            open: openFormStatus,
            handleClose: handleCloseFormStatus,
            selected: selectedOrdemDeServico,
            handleToggle: handleToggleOrdemDeServicoStatus,
          }}
        />
      </Layout>
    </Loading>
  );
};
