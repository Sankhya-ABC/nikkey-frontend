import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { DatePicker } from "../../components/Form/DatePicker";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";

import { mockCertificados } from "./provider";
import { TableCertificados } from "./TableCertificados";

interface CertificadoSearch {
  search: string;
  dataInicio: Date | null | number | string;
  dataFim: Date | null | number | string;
}

const defaultValues: CertificadoSearch = {
  search: "",
  dataInicio: null,
  dataFim: null,
};

export const Certificados = () => {
  // hooks
  const { control, watch } = useForm<CertificadoSearch>({
    defaultValues,
  });

  // useStates
  // -- data
  const [certificados] = useState(mockCertificados);
  const [filteredCertificados, setFilteredCertificados] =
    useState(mockCertificados);

  // -- search
  const [loading, setLoading] = useState(false);
  const search = watch("search");

  // -- table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // variables
  const paginatedCertificados = filteredCertificados.slice(
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
    const filtered = certificados.filter((certificado) =>
      certificado?.id?.toString().includes(search?.toLowerCase()),
    );
    setFilteredCertificados(filtered);
    setPage(0);
  }, [search, certificados]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Certificados">
        <Grid size={{ xs: 12, md: 3 }}>
          <DatePicker label="Data início" name="dataInicio" control={control} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DatePicker label="Data fim" name="dataFim" control={control} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TableCertificados
            {...{
              paginatedList: paginatedCertificados,
              filteredList: filteredCertificados,
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
