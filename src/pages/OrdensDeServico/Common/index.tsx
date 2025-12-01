import { Search } from "@mui/icons-material";
import { Grid, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "../../../components/Form/Textfield";
import { Loading } from "../../../components/Loading";
import { Layout } from "../../../components/Template/Layout";
import { mockOrdensDeServico } from "./provider";
import { TableOrdensDeServico } from "./TableOrdensDeServico";

interface OrdemDeServicoSearch {
  search: string;
}

const defaultValues: OrdemDeServicoSearch = {
  search: "",
};

export const OrdensDeServicoCommon = () => {
  // hooks
  const { control, watch } = useForm<OrdemDeServicoSearch>({
    defaultValues,
  });

  // useStates
  // -- data
  const [ordensDeServico] = useState(mockOrdensDeServico);
  const [filteredOrdensDeServico, setFilteredOrdensDeServico] =
    useState(mockOrdensDeServico);

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

  // useEffects
  useEffect(() => {
    const filtered = ordensDeServico.filter((ordemDeServico) =>
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
        <Grid item size={{ xs: 12 }}>
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

        <Grid item size={{ xs: 12 }}>
          <TableOrdensDeServico
            {...{
              paginatedList: paginatedOrdensDeServico,
              filteredList: filteredOrdensDeServico,
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
