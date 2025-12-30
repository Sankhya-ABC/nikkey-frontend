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

import { TextField } from "@/components/Form/Textfield";

import { OrdemDeServico } from "../types";

export const ContagemTotal: React.FC = () => {
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
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({
              length: armadilhaLuminosaQuantidade,
            })?.map((_data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ width: "25%" }}>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.${index}.identificacao`}
                      label={`${index + 1}`}
                    />
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>
                    <TextField
                      control={control}
                      name={`armadilhaLuminosa.contagem.${index}.quantidade`}
                      label={`${index + 1}`}
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
