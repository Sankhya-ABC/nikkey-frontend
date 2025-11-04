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
import { ComoEncontrado } from "../type";
import { listPragas } from "./provider";

export const PragasEncontradas = () => {
  const { control, watch } = useFormContext();

  const flagEvidenciasPragas = watch("flagEvidenciasOuFocosPragas");

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

        {flagEvidenciasPragas && (
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
                  <TableRow>
                    <TableCell>
                      <Select
                        label="Praga"
                        name="pragas.0.idPraga"
                        control={control}
                        propertyLabel="descricao"
                        propertyValue="id"
                        options={listPragas}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        label="Como Encontrado"
                        name="pragas.0.comoEncontrado"
                        control={control}
                        propertyLabel="descricao"
                        propertyValue="value"
                        options={Object.values(ComoEncontrado).map((value) => ({
                          id: value,
                          descricao: value,
                        }))}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        control={control}
                        name="pragas.0.ondeEncontrado"
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        control={control}
                        name="pragas.0.quantidade"
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
            <Button startIcon={<Add />} sx={{ mt: 1 }}>
              Adicionar Praga
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
