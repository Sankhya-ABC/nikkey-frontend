import { Search } from "@mui/icons-material";
import { Grid, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "../../components/Form/DatePicker";
import { TextField } from "../../components/Form/Textfield";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { mockRelatoriosProdutividade } from "./provider";
import { TableRelatoriosProdutividade } from "./TableRelatoriosProdutividade";

interface RelatorioProdutividadeSearch {
  search: string;
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

const defaultValues: RelatorioProdutividadeSearch = {
  search: "",
  dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  dataFim: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
};

export const RelatoriosProdutividade = () => {
  // hooks
  const { control, watch } = useForm<RelatorioProdutividadeSearch>({
    defaultValues,
  });

  // useStates
  // -- data
  const [relatoriosProdutividade] = useState(mockRelatoriosProdutividade);
  const [filteredRelatoriosProdutividade, setFilteredRelatoriosProdutividade] =
    useState(mockRelatoriosProdutividade);

  // -- search
  const [loading, setLoading] = useState(true);
  const search = watch("search");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedRelatoriosProdutividade =
    filteredRelatoriosProdutividade.slice(
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

  // useEffects
  useEffect(() => {
    const filtered = relatoriosProdutividade.filter((relatorioProdutividade) =>
      relatorioProdutividade?.tecnico
        ?.toLowerCase()
        ?.includes(search?.toLowerCase()),
    );
    setFilteredRelatoriosProdutividade(filtered);
    setPage(0);
  }, [search, relatoriosProdutividade]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Relatório de Produtividade">
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            control={control}
            name="search"
            TextFieldProps={{
              InputProps: {
                placeholder: "Pesquise por técnico...",
                endAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DatePicker label="Data início" name="dataInicio" control={control} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DatePicker label="Data fim" name="dataFim" control={control} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TableRelatoriosProdutividade
            {...{
              paginatedList: paginatedRelatoriosProdutividade,
              filteredList: filteredRelatoriosProdutividade,
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
