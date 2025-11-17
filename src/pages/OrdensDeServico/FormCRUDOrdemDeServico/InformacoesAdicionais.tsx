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
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { OrdemDeServico } from "../types";

export const InformacoesAdicionais = () => {
  const { control, watch, getValues, setValue } =
    useFormContext<OrdemDeServico>();

  const naoConformidades = watch("naoConformidades.naoConformidades");
  const flagNaoConformidades = watch("naoConformidades.flag");

  const handleAdd = () => {
    const actualList = getValues("naoConformidades.naoConformidades");
    actualList?.push({
      areaLocal: "",
      naoConformidade: "",
      acaoSugerida: "",
    });
    setValue("naoConformidades.naoConformidades", actualList);
  };

  const handleDelete = (index: number) => {
    const actualList = getValues("naoConformidades.naoConformidades");
    actualList?.splice(index, 1);
    setValue("naoConformidades.naoConformidades", actualList);
  };

  useEffect(() => {
    if (!flagNaoConformidades) {
      setValue("naoConformidades.naoConformidades", []);
    }
  }, [flagNaoConformidades]);

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Informações Adicionais
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="naoConformidades.flag"
            label="Não conformidades?"
          />
        </Grid>

        {flagNaoConformidades && naoConformidades?.length ? (
          <Grid item size={{ xs: 12 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Área/Local</TableCell>
                    <TableCell>Não Conformidade</TableCell>
                    <TableCell>Ação Sugerida</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {naoConformidades?.map((_data, index) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <TextField
                            control={control}
                            name={`naoConformidades.naoConformidades.${index}.areaLocal`}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            control={control}
                            name={`naoConformidades.naoConformidades.${index}.naoConformidade`}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            control={control}
                            name={`naoConformidades.naoConformidades.${index}.acaoSugerida`}
                          />
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

        {flagNaoConformidades && (
          <Box>
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{ mt: 1 }}
              onClick={handleAdd}
            >
              Adicionar Não Conformidade
            </Button>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
