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
import { DatePicker } from "../../../components/Form/DatePicker";
import { Select } from "../../../components/Form/Select";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { OrdemServico } from "../type";
import { listEquipamentos, listProdutos } from "./provider";

export const ConsumoProdutos = () => {
  const { control, watch } = useFormContext<OrdemServico>();

  const flagConsumoProdutos = watch("flagConsumoProdutos");

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

        {flagConsumoProdutos && (
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
                  <TableRow>
                    <TableCell sx={{ width: "40%" }}>
                      <Select
                        label="Produto"
                        name="consumo.0.idProduto"
                        control={control}
                        propertyLabel="descricao"
                        propertyValue="id"
                        options={listProdutos}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "40%" }}>
                      <TextField
                        control={control}
                        name="consumo.0.lote"
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        label="Validade"
                        name="consumo.0.validade"
                        control={control}
                      />
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <Select
                        label="Equipamento"
                        name="consumo.0.idEquipamento"
                        control={control}
                        propertyLabel="descricao"
                        propertyValue="id"
                        options={listEquipamentos}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        control={control}
                        name="consumo.0.quantidade"
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="outlined" startIcon={<Add />} sx={{ mt: 1 }}>
              Adicionar Consumo
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
