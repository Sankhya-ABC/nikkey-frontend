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

import { DatePicker } from "@/components/Form/DatePicker";
import { Select } from "@/components/Form/Select";
import { Switch } from "@/components/Form/Switch";
import { TextField } from "@/components/Form/Textfield";
import { OrdemDeServico } from "@/services/OrdensDeServico/types";
import { CRUDType } from "@/services/types";

export const ConsumoProdutos = () => {
  // hooks
  const { control, watch, getValues, setValue } =
    useFormContext<OrdemDeServico>();

  // variables
  const consumo = watch("consumo");
  const flagConsumoProdutos = watch("flagConsumoProdutos");
  const formType = watch("formType");

  // handlers
  const handleAdd = () => {
    const actualList = getValues("consumo");
    actualList?.push({
      idPraga: "",
      idProduto: "",
      lote: "",
      validade: null,
      idEquipamento: "",
      quantidade: "",
    });
    setValue("consumo", actualList);
  };

  const handleDelete = (index: number) => {
    const actualList = getValues("consumo");
    actualList?.splice(index, 1);
    setValue("consumo", actualList);
  };

  // useEffects
  useEffect(() => {
    if (!flagConsumoProdutos) {
      setValue("consumo", []);
    }
  }, [flagConsumoProdutos]);

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Consumo de Produtos
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Switch
            readOnly={formType === CRUDType.READ}
            control={control}
            name="flagConsumoProdutos"
            label="Consumo de produtos?"
          />
        </Grid>

        {flagConsumoProdutos && consumo?.length ? (
          <Grid size={{ xs: 12 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Lote</TableCell>
                    <TableCell>Validade</TableCell>
                    <TableCell>Equipamento</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consumo?.map((_data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ width: "40%" }}>
                          <Select
                            name={`consumo.${index}.idProduto`}
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            options={produtos}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "40%" }}>
                          <TextField
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`consumo.${index}.lote`}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`consumo.${index}.validade`}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "20%" }}>
                          <Select
                            name={`consumo.${index}.idEquipamento`}
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            options={equipamentos}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            readOnly={formType === CRUDType.READ}
                            control={control}
                            name={`consumo.${index}.quantidade`}
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

        {flagConsumoProdutos && formType !== CRUDType.READ && (
          <Box>
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{ mt: 1 }}
              onClick={handleAdd}
            >
              Adicionar Consumo
            </Button>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
