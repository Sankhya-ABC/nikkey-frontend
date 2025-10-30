import { Add, Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { ModalDesativar } from "./ModaDesativar";
import { ModalCadastrar } from "./ModalCadastrar";
import { ModalEditar } from "./ModalEditar";
import { ModalVisualizar } from "./ModalVisualizar";
import { mockOrdemDeServicos } from "./provider";
import { TableOrdemDeServicos } from "./TableOrdemDeServicos";
import { DatePicker } from "../../components/Form/DatePicker";
import { useForm } from "react-hook-form";

export const OrdemDeServico = () => {
  const { control } = useForm();

  const [ordemDeServicos, setOrdemDeServico] = useState(mockOrdemDeServicos);
  const [filteredOrdemDeServicos, setfilteredOrdemDeServicos] =
    useState(mockOrdemDeServicos);
  const [loading, setLoading] = useState(true);

  const [selectedOrdemDeServico, setSelectedOrdemDeServico] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    const filtered = ordemDeServicos.filter(
      (ordemDeServico) =>
        ordemDeServico?.cliente
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        ordemDeServico?.tecnico
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()),
    );
    setfilteredOrdemDeServicos(filtered);
    setPage(0);
  }, [searchTerm, ordemDeServicos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event?.target?.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

  const handleOpenViewDialog = (ordemDeServico) => {
    setSelectedOrdemDeServico(ordemDeServico);
    setOpenViewDialog(true);
  };

  const handleOpenEditDialog = (ordemDeServico) => {
    setSelectedOrdemDeServico(ordemDeServico);
    setOpenEditDialog(true);
  };

  const handleOpenDeactivateDialog = (ordemDeServico) => {
    setSelectedOrdemDeServico(ordemDeServico);
    setOpenDeactivateDialog(true);
  };

  const handleOpenCreateDialog = () => {
    setSelectedOrdemDeServico(null);
    setOpenCreateDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedOrdemDeServico(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedOrdemDeServico(null);
  };

  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false);
    setSelectedOrdemDeServico(null);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setSelectedOrdemDeServico(null);
  };

  const handleToggleOrdemDeServicoStatus = () => {
    if (selectedOrdemDeServico) {
      const updatedOrdemDeServicos = ordemDeServicos?.map((ordemDeServico) =>
        ordemDeServico?.numero === selectedOrdemDeServico?.numero
          ? {
              ...ordemDeServico,
              ativo: !ordemDeServico?.ativo,
            }
          : ordemDeServico,
      );
      setOrdemDeServico(updatedOrdemDeServicos);
      handleCloseDeactivateDialog();
    }
  };

  const paginatedOrdemDeServicos = filteredOrdemDeServicos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
            onClick={handleOpenCreateDialog}
          >
            Cadastrar
          </Button>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar por cliente ou técnico..."
            value={searchTerm}
            size="small"
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <DatePicker label="Data início" name="dataInicio" control={control} />
        </Grid>

        <Grid item size={{ xs: 12, md: 3 }}>
          <DatePicker label="Data fim" name="dataInicio" control={control} />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <TableOrdemDeServicos
            {...{
              paginatedOrdemDeServicos,
              handleOpenViewDialog,
              handleOpenEditDialog,
              handleOpenDeactivateDialog,
              filteredOrdemDeServicos,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>

        <ModalVisualizar
          {...{
            selectedOrdemDeServico,
            openViewDialog,
            handleCloseViewDialog,
          }}
        />

        <ModalEditar
          {...{
            selectedOrdemDeServico,
            openEditDialog,
            handleCloseEditDialog,
          }}
        />

        <ModalDesativar
          {...{
            selectedOrdemDeServico,
            handleToggleOrdemDeServicoStatus,
            openDeactivateDialog,
            handleCloseDeactivateDialog,
          }}
        />

        <ModalCadastrar
          {...{
            openCreateDialog,
            handleCloseCreateDialog,
          }}
        />
      </Layout>
    </Loading>
  );
};
