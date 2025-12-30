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

import { Switch } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Textfield";
import { OrdemDeServico } from "@/services/OrdensDeServico/types";
import { CRUDType } from "@/services/types";

export const InformacoesAdicionais = () => {
  // hooks
  const { control, watch, getValues, setValue } =
    useFormContext<OrdemDeServico>();

  // variables
  const naoConformidades = watch("naoConformidades.naoConformidades");
  const flagNaoConformidades = watch("naoConformidades.flag");
  const formType = watch("formType");

  // handlers
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

  // useEffects
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
        <Grid size={{ xs: 12 }}>
          <Switch
            readOnly={formType === CRUDType.READ}
            control={control}
            name="naoConformidades.flag"
            label="Não conformidades?"
          />
        </Grid>

        {flagNaoConformidades && naoConformidades?.length ? (
          <Grid size={{ xs: 12 }}>
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
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`naoConformidades.naoConformidades.${index}.areaLocal`}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`naoConformidades.naoConformidades.${index}.naoConformidade`}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`naoConformidades.naoConformidades.${index}.acaoSugerida`}
                          />
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

        {flagNaoConformidades && formType !== CRUDType.READ && (
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
