import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Select } from "@/components/Form/Select";
import { Switch } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Textfield";
import {
  ComoEncontrado,
  OrdemDeServico,
} from "@/services/OrdensDeServico/types";
import { CRUDType } from "@/services/types";

import { Autocomplete } from "@/components/Form/Autocomplete";
import { pragaService } from "@/services/Praga";

export const PragasEncontradas = () => {
  // hooks
  const { control, watch, getValues, setValue } =
    useFormContext<OrdemDeServico>();

  // variables
  const pragas = watch("pragas");
  const flagEvidenciasPragas = watch("flagEvidenciasOuFocosPragas");
  const formType = watch("formType");

  // handlers
  const handleAdd = () => {
    const actualList = getValues("pragas");
    actualList?.push({
      idPraga: "",
      comoEncontrado: "",
      ondeEncontrado: "",
      quantidade: "",
    });
    setValue("pragas", actualList);
  };

  const handleDelete = (index: number) => {
    const actualList = getValues("pragas");
    actualList?.splice(index, 1);
    setValue("pragas", actualList);
  };

  // requests
  const pesquisarPragas = async (search: string) => {
    try {
      return await pragaService.pesquisarPragas(search);
    } catch {
      return [];
    }
  };

  // useEffects
  useEffect(() => {
    if (!flagEvidenciasPragas) {
      setValue("pragas", []);
    }
  }, [flagEvidenciasPragas]);

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Pragas Encontradas
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Switch
            readOnly={formType === CRUDType.READ}
            control={control}
            name="flagEvidenciasOuFocosPragas"
            label="Evidências ou focos de pragas?"
          />
        </Grid>

        {flagEvidenciasPragas && pragas?.length ? (
          <Grid size={{ xs: 12 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Praga</TableCell>
                    <TableCell>Como Encontrado</TableCell>
                    <TableCell>Onde Encontrado</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pragas?.map((_data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ width: "25%" }}>
                          <Autocomplete
                            name={`pragas.${index}.idPraga`}
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            fetchOptions={pesquisarPragas}
                            minCharsToSearch={1}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          <Select
                            name={`pragas.${index}.comoEncontrado`}
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            options={Object.values(ComoEncontrado).map(
                              (value) => ({
                                id: value,
                                descricao: value,
                              }),
                            )}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          <TextField
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`pragas.${index}.ondeEncontrado`}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {getValues(`pragas.${index}.comoEncontrado`) !==
                            ComoEncontrado.FRAGMENTOS && (
                            <TextField
                              readOnly={formType === CRUDType.READ}
                              control={control}
                              name={`pragas.${index}.quantidade`}
                            />
                          )}
                        </TableCell>
                        {formType !== CRUDType.READ && (
                          <TableCell>
                            <IconButton onClick={() => handleDelete(index)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null}

        {flagEvidenciasPragas && formType !== CRUDType.READ && (
          <Box>
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{ mt: 1 }}
              onClick={handleAdd}
            >
              Adicionar Praga
            </Button>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
