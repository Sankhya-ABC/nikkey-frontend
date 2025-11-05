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
import React from "react";
import { useFormContext } from "react-hook-form";
import { Select } from "../../../components/Form/Select";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { OrdemServico, TipoContagem } from "../type";
import { listPragas } from "./provider";

export const Equipamentos: React.FC = () => {
  const { control, watch } = useFormContext<OrdemServico>();

  const flagRevisaoEquipamentos = watch("flagRevisaoEquipamentos");
  const flagIscagem = watch("iscagem.flag");
  const flagPlacaCola = watch("placaColaArmadilhaMecanica.flag");
  const flagArmadilhaLuminosa = watch("armadilhaLuminosa.flag");
  const flagContagemInsetos = watch(
    "armadilhaLuminosa.flagClienteExigeContagemInsetosPorArmadilha",
  );
  const tipoContagem = watch("armadilhaLuminosa.tipoContagem");
  const flagArmadilhaFeromonio = watch("armadilhaFeromonio.flag");

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Equipamentos
      </Typography>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12 }}>
          <Switch
            control={control}
            name="flagRevisaoEquipamentos"
            label="Revisão de equipamentos?"
          />
        </Grid>

        {flagRevisaoEquipamentos && (
          <>
            <Grid item size={{ xs: 12 }}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Iscagem
                </Typography>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="iscagem.flag"
                      label="Iscagem ativa?"
                    />
                  </Grid>

                  {flagIscagem && (
                    <>
                      <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="iscagem.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Mofo/Deterioração
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="iscagem.mofoDeterioracao.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="iscagem.mofoDeterioracao.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Roído
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="iscagem.roido.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="iscagem.roido.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Obstruído/Quebrado/Extraviado
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="iscagem.obstruidoQuebradoExtraviado.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="iscagem.obstruidoQuebradoExtraviado.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  p: 2,
                  borderRadius: 1,
                  mt: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Placa Cola/Armadilha Mecânica
                </Typography>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="placaColaArmadilhaMecanica.flag"
                      label="Placa cola/armadilha mecânica ativa?"
                    />
                  </Grid>

                  {flagPlacaCola && (
                    <>
                      <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="placaColaArmadilhaMecanica.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Sujeira/Deterioração
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="placaColaArmadilhaMecanica.sujeiraDeterioracao.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="placaColaArmadilhaMecanica.sujeiraDeterioracao.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Roedor Aderido
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="placaColaArmadilhaMecanica.roedorAderido.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="placaColaArmadilhaMecanica.roedorAderido.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Obstruído/Quebrado/Extraviado
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="placaColaArmadilhaMecanica.obstruidoQuebradoExtraviado.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="placaColaArmadilhaMecanica.obstruidoQuebradoExtraviado.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  p: 2,
                  borderRadius: 1,
                  mt: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Armadilha Luminosa
                </Typography>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="armadilhaLuminosa.flag"
                      label="Armadilha luminosa ativa?"
                    />
                  </Grid>

                  {flagArmadilhaLuminosa && (
                    <>
                      <Grid item size={{ xs: 12 }}>
                        <Switch
                          control={control}
                          name="armadilhaLuminosa.flagClienteExigeContagemInsetosPorArmadilha"
                          label="Cliente exige contagem de insetos por armadilha?"
                        />
                      </Grid>

                      {flagContagemInsetos && (
                        <>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <Select
                              label="Tipo de Contagem"
                              name="armadilhaLuminosa.tipoContagem"
                              control={control}
                              propertyLabel="descricao"
                              propertyValue="value"
                              options={[
                                {
                                  id: TipoContagem.TOTAL,
                                  descricao: "Total",
                                },
                                {
                                  id: TipoContagem.ESPECIE,
                                  descricao: "Por Espécie",
                                },
                              ]}
                            />
                          </Grid>

                          <Grid item size={{ xs: 12 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Contagem de Insetos
                            </Typography>

                            {tipoContagem === TipoContagem.TOTAL ? (
                              <Grid container spacing={2}>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                  <TextField
                                    control={control}
                                    name="armadilhaLuminosa.contagem.0.quantidade"
                                    label="Quantidade Total"
                                    type="number"
                                  />
                                </Grid>
                                <Grid item size={{ xs: 12, md: 6 }}>
                                  <TextField
                                    control={control}
                                    name="armadilhaLuminosa.contagem.0.identificacao"
                                    label="Identificação"
                                    multiline
                                    rows={2}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Praga</TableCell>
                                      <TableCell>Quantidade</TableCell>
                                      <TableCell>Identificação</TableCell>
                                      <TableCell>Ações</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>
                                        <Select
                                          label="Praga"
                                          name="armadilhaLuminosa.contagem.0.idPraga"
                                          control={control}
                                          propertyLabel="descricao"
                                          propertyValue="id"
                                          options={listPragas}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          control={control}
                                          name="armadilhaLuminosa.contagem.0.quantidade"
                                          label=""
                                          type="number"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          control={control}
                                          name="armadilhaLuminosa.contagem.0.identificacao"
                                          label=""
                                          multiline
                                          rows={2}
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
                                <Button
                                  startIcon={<Add />}
                                  sx={{ mt: 1, ml: 2 }}
                                >
                                  Adicionar Contagem
                                </Button>
                              </TableContainer>
                            )}
                          </Grid>
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  p: 2,
                  borderRadius: 1,
                  mt: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Armadilha Feromônio
                </Typography>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="armadilhaFeromonio.flag"
                      label="Armadilha feromônio ativa?"
                    />
                  </Grid>

                  {flagArmadilhaFeromonio && (
                    <>
                      <Grid item size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="armadilhaFeromonio.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Guachon
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="armadilhaFeromonio.guachon.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="armadilhaFeromonio.guachon.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item size={{ xs: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Bio Serrico
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="armadilhaFeromonio.bioSerrico.quantidade"
                              label="Quantidade"
                              type="number"
                            />
                          </Grid>
                          <Grid item size={{ xs: 12, md: 6 }}>
                            <TextField
                              control={control}
                              name="armadilhaFeromonio.bioSerrico.identificacao"
                              label="Identificação"
                              multiline
                              rows={2}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
