import { Search } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "../../components/Form/DatePicker";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { mockRelatorioProdutividade } from "./provider";
import { TableRelatorioProdutividade } from "./TableRelatorioProdutividade";

export const RelatorioProdutividade = () => {
  const { control } = useForm();

  const [relatoriosProdutividade] = useState(mockRelatorioProdutividade);
  const [filteredRelatoriosProdutividade, setFilteredRelatoriosProdutividade] =
    useState(mockRelatorioProdutividade);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = relatoriosProdutividade.filter((relatorioProdutividade) =>
      relatorioProdutividade?.tecnico
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()),
    );
    setFilteredRelatoriosProdutividade(filtered);
    setPage(0);
  }, [searchTerm, relatoriosProdutividade]);

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

  const paginatedRelatoriosProdutividade =
    filteredRelatoriosProdutividade.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Relatório de Produtividade">
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar por técnico"
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
          <TableRelatorioProdutividade
            {...{
              paginatedRelatoriosProdutividade,
              filteredRelatoriosProdutividade,
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        </Grid>
      </Layout>
    </Loading>
  );
};
