import { Search } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/Form/Textfield";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Action } from "@/components/Table/types";
import { useAlert } from "@/hooks/useAlert";
import { certificadoService } from "@/services/Certificado";
import { Certificado } from "@/services/Certificado/types";
import { ErrorMessage, GetAllPaginated } from "@/services/types";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "@/utils/constants";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { format } from "date-fns";

interface CertificadoSearch {
  search: string;
}

const defaultValues: CertificadoSearch = {
  search: "",
};

interface ConsultaCertificadoProps {
  actions?: Action<Certificado>[];
  resetConsulta?: boolean;
  setResetConsulta?: Dispatch<SetStateAction<boolean>>;
}

export const ConsultaCertificado: React.FC<ConsultaCertificadoProps> = ({
  actions,
  resetConsulta,
  setResetConsulta,
}) => {
  // hooks
  const { control, watch, setValue } = useForm<CertificadoSearch>({
    defaultValues,
  });
  const { showAlert } = useAlert();

  // useStates
  // -- table
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // -- data
  const [certificados, setCertificados] =
    useState<GetAllPaginated<Certificado> | null>(null);

  // -- search
  const [loading, setLoading] = useState(false);

  // variables
  const search = watch("search");

  // handlers
  // -- table
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    buscarTodosCertificados(rowsPerPage, newPage, search);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const newRowsPerPage = parseInt(event?.target?.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(DEFAULT_PAGE);
    buscarTodosCertificados(newRowsPerPage, DEFAULT_PAGE, search);
  };

  // requests
  const buscarTodosCertificados = async (
    per_page: number,
    page: number,
    search: string,
  ) => {
    setLoading(true);
    try {
      const resp = await certificadoService.buscarTodosCertificados({
        per_page,
        page: page + 1,
        search,
      });
      setCertificados(resp);
    } catch (error) {
      const err = error as ErrorMessage;
      showAlert({
        title: "Erro",
        children: err?.message,
        severity: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImprimirCertificado = async (id: number) => {
    try {
      await certificadoService.imprimirCertificadoPorId(id);
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

  // useEffects
  useEffect(() => {
    (async () => {
      setPage(DEFAULT_PAGE);
      await buscarTodosCertificados(rowsPerPage, page, search);
    })();
  }, [search]);

  useEffect(() => {
    if (resetConsulta && setResetConsulta) {
      (async () => {
        setValue("search", "");
        setPage(DEFAULT_PAGE);
        await buscarTodosCertificados(rowsPerPage, page, search);
        setResetConsulta(false);
      })();
    }
  }, [resetConsulta]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <TextField
          control={control}
          name="search"
          TextFieldProps={{
            slotProps: {
              input: {
                placeholder: "Pesquise por nome ou email...",
                endAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            },
          }}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Loading loading={loading}>
          <Table<Certificado>
            headers={[
              {
                text: "Nº OS",
                value: (certificado: Certificado) => certificado?.id,
              },
              {
                text: "Validade",
                value: (certificado: Certificado) =>
                  format(
                    certificado?.validade as string,
                    "dd/MM/yyyy",
                  ) as string,
              },
              {
                text: "Documento",
                value: (certificado: Certificado) => (
                  <Tooltip title="Baixar certificado" arrow placement="top">
                    <IconButton
                      onClick={() =>
                        handleImprimirCertificado(certificado?.id! as number)
                      }
                    >
                      <WorkspacePremiumIcon />
                    </IconButton>
                  </Tooltip>
                ),
              },
            ]}
            actions={actions}
            pagination={{
              rowsPerPage,
              page,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
            dataList={certificados}
            itemId={(certificado: Certificado) => certificado?.id!.toString()}
            noResultsMessage={"Nenhum certificado encontrado."}
          />
        </Loading>
      </Grid>
    </Grid>
  );
};
