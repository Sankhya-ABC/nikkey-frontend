import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { FieldPath, useFormContext } from "react-hook-form";
import { TextField } from "../../../components/Form/Textfield";
import { OrdemServico } from "../types";

interface QuantidadeIdentificacaoProps {
  title: string;
  property: string;
}

export const QuantidadeIdentificacao: React.FC<
  QuantidadeIdentificacaoProps
> = ({ title, property }) => {
  const { control, watch } = useFormContext<OrdemServico>();

  const iscagemMofoDeterioracaoQuantidade = Number(
    watch(`${property}.quantidade` as FieldPath<OrdemServico>),
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            control={control}
            name={`${property}.quantidade`}
            label="Quantidade"
            type="number"
          />
        </Grid>
        {iscagemMofoDeterioracaoQuantidade > 0 && (
          <Grid item size={{ xs: 12 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Identificação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({
                    length: iscagemMofoDeterioracaoQuantidade,
                  })?.map((_data, index) => {
                    return (
                      <TableRow>
                        <TableCell sx={{ width: "25%" }}>
                          <TextField
                            control={control}
                            name={`${property}.identificacao.${index}`}
                            label={`${index + 1}`}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
