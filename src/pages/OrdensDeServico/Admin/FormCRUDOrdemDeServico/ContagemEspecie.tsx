import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "../../../../components/Form/Textfield";
import { OrdemDeServico } from "../types";

export const ContagemEspecie: React.FC = () => {
  const { control, watch } = useFormContext<OrdemDeServico>();

  const armadilhaLuminosaQuantidade = Number(
    watch("armadilhaLuminosa.quantidade"),
  );

  return (
    armadilhaLuminosaQuantidade > 0 && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Identificação</TableCell>
              <TableCell>Mosca</TableCell>
              <TableCell>Mosquito</TableCell>
              <TableCell>Mariposa</TableCell>
              <TableCell>Besouro</TableCell>
              <TableCell>Outros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({
              length: armadilhaLuminosaQuantidade,
            })?.map((_data, index) => {
              return (
                <TableRow>
                  <TableCell>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.identificacao.${index}`}
                      label={`${index + 1}`}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.mosca${index}`}
                      label="Qtd"
                      type="number"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.mosca${index}`}
                      label="Qtd"
                      type="number"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.mosca${index}`}
                      label="Qtd"
                      type="number"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.mosca${index}`}
                      label="Qtd"
                      type="number"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.mosca${index}`}
                      label="Qtd"
                      type="number"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};
