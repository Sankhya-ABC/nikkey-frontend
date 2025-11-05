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
import { DatePicker } from "../../../components/Form/DatePicker";
import { Select } from "../../../components/Form/Select";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { OrdemServico } from "../type";
import { listEquipamentos, listProdutos } from "./provider";

export const ConsumoProdutos = () => {
  const { control, watch, getValues, setValue } =
    useFormContext<OrdemServico>();

  const consumo = watch("consumo");
  const flagConsumoProdutos = watch("flagConsumoProdutos");

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
        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="flagConsumoProdutos"
            label="Consumo de produtos?"
          />
        </Grid>

        {flagConsumoProdutos && consumo?.length ? (
          <Grid item size={{ xs: 12 }}>
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
                      <TableRow>
                        <TableCell sx={{ width: "40%" }}>
                          <Select
                            name={`consumo.${index}.idProduto`}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            options={listProdutos}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "40%" }}>
                          <TextField
                            control={control}
                            name={`consumo.${index}.lote`}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            control={control}
                            name={`consumo.${index}.validade`}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "20%" }}>
                          <Select
                            name={`consumo.${index}.idEquipamento`}
                            control={control}
                            propertyLabel="descricao"
                            propertyValue="id"
                            options={listEquipamentos}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            control={control}
                            name={`consumo.${index}.quantidade`}
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

        {flagConsumoProdutos && (
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
