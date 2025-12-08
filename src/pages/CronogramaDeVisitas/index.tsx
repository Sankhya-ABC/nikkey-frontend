import { Search } from "@mui/icons-material";
import { Grid, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "../../components/Form/Textfield";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { mockCronogramasDeVisitas } from "./provider";
import { TableCronogramasDeVisitas } from "./TableCronogramasDeVisitas";

interface CronogramaDeVisitasSearch {
  search: string;
}

const defaultValues: CronogramaDeVisitasSearch = {
  search: "",
};

export const CronogramasDeVisitas = () => {
  // hooks
  const { control, watch } = useForm<CronogramaDeVisitasSearch>({
    defaultValues,
  });

  // useStates
  // -- data
  const [cronogramasDeVisitas] = useState(mockCronogramasDeVisitas);
  const [filteredCronogramasDeVisitas, setFilteredCronogramasDeVisitas] =
    useState(mockCronogramasDeVisitas);

  // -- search
  const [loading, setLoading] = useState(true);
  const search = watch("search");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedCronogramasDeVisitas = filteredCronogramasDeVisitas.slice(
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
    const filtered = cronogramasDeVisitas.filter((cronogramaDeVisitas) =>
      cronogramaDeVisitas?.tecnico?.nome
        ?.toLowerCase()
        ?.includes(search?.toLowerCase()),
    );
    setFilteredCronogramasDeVisitas(filtered);
    setPage(0);
  }, [search, cronogramasDeVisitas]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Cronograma de Visitas">
        <Grid size={{ xs: 12 }}>
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

        <Grid size={{ xs: 12 }}>
          <TableCronogramasDeVisitas
            {...{
              paginatedList: paginatedCronogramasDeVisitas,
              filteredList: filteredCronogramasDeVisitas,
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
