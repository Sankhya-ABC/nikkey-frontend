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
import { useFormContext } from "react-hook-form";
import { Select } from "../../../components/Form/Select";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { ComoEncontrado, OrdemServico } from "../type";
import { listPragas } from "./provider";
import { useEffect } from "react";

export const PragasEncontradas = () => {
  const { control, watch, getValues, setValue } =
    useFormContext<OrdemServico>();

  const pragas = watch("pragas");
  const flagEvidenciasPragas = watch("flagEvidenciasOuFocosPragas");

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
        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="flagEvidenciasOuFocosPragas"
            label="Evidências ou focos de pragas?"
          />
        </Grid>

        {flagEvidenciasPragas && pragas?.length ? (
          <Grid item size={{ xs: 12 }}>
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
                      <TableRow>
                        <TableCell sx={{ width: "25%" }}>
                          <Select
                            name={`pragas.${index}.idPraga`}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            options={listPragas}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          <Select
                            name={`pragas.${index}.comoEncontrado`}
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
                            control={control}
                            name={`pragas.${index}.ondeEncontrado`}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {getValues(`pragas.${index}.comoEncontrado`) !==
                            ComoEncontrado.FRAGMENTOS && (
                            <TextField
                              control={control}
                              name={`pragas.${index}.quantidade`}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(index)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null}

        {flagEvidenciasPragas && (
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
