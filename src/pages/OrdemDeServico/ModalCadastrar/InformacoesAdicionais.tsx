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
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";

export const InformacoesAdicionais = () => {
  const { control, watch } = useFormContext();

  const flagNaoConformidades = watch("naoConformidades.flag");

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

        {flagNaoConformidades && (
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
                  <TableRow>
                    <TableCell>
                      <TextField
                        control={control}
                        name="naoConformidades.naoConformidades.0.areaLocal"
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        control={control}
                        name="naoConformidades.naoConformidades.0.naoConformidade"
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        control={control}
                        name="naoConformidades.naoConformidades.0.acaoSugerida"
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
              Adicionar Não Conformidade
            </Button>
          </Grid>
        )}

        <Grid item size={{ xs: 12 }}>
          <TextField
            control={control}
            name="observacoes"
            label="Observações"
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
