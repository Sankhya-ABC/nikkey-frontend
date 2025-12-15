import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

import { Select } from "../../../../components/Form/Select";
import { Switch } from "../../../../components/Form/Switch";
import { TextField } from "../../../../components/Form/Textfield";
import { OrdemDeServico, TipoContagem } from "../types";

import { ContagemEspecie } from "./ContagemEspecie";
import { ContagemTotal } from "./ContagemTotal";
import { QuantidadeIdentificacao } from "./QuantidadeIdentificacao";

export const Equipamentos: React.FC = () => {
  const { control, watch } = useFormContext<OrdemDeServico>();

  const flagRevisaoEquipamentos = watch("flagRevisaoEquipamentos");
  const flagIscagem = watch("iscagem.flag");
  const flagPlacaCola = watch("placaColaArmadilhaMecanica.flag");
  const flagArmadilhaLuminosa = watch("armadilhaLuminosa.flag");
  const flagContagemInsetos = watch(
    "armadilhaLuminosa.flagClienteExigeContagemInsetosPorArmadilha",
  );
  const tipoContagem = watch("armadilhaLuminosa.tipoContagem");
  const flagArmadilhaFeromonio = watch("armadilhaFeromonio.flag");
  const armadilhaLuminosaQuantidade = Number(
    watch("armadilhaLuminosa.quantidade"),
  );

  return (
    <Box>
      <Typography variant="h6" color="primary">
        Equipamentos
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Switch
            control={control}
            name="flagRevisaoEquipamentos"
            label="Revisão de equipamentos?"
          />
        </Grid>

        {flagRevisaoEquipamentos && (
          <>
            <Grid size={{ xs: 12 }}>
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
                  <Grid size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="iscagem.flag"
                      label="Iscagem ativa?"
                    />
                  </Grid>

                  {flagIscagem && (
                    <>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="iscagem.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Mofo/Deterioração"
                          property="iscagem.mofoDeterioracao"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Roído"
                          property="iscagem.roido"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Obstruído/Quebrado/Extraviado"
                          property="iscagem.obstruidoQuebradoExtraviado"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
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
                  <Grid size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="placaColaArmadilhaMecanica.flag"
                      label="Placa cola/armadilha mecânica ativa?"
                    />
                  </Grid>

                  {flagPlacaCola && (
                    <>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="placaColaArmadilhaMecanica.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Sujeira/Deterioração"
                          property="placaColaArmadilhaMecanica.sujeiraDeterioracao"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Roedor Aderido"
                          property="placaColaArmadilhaMecanica.roedorAderido"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title=" Obstruído/Quebrado/Extraviado"
                          property="placaColaArmadilhaMecanica.obstruidoQuebradoExtraviado"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
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
                  <Grid size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="armadilhaLuminosa.flag"
                      label="Armadilha luminosa ativa?"
                    />
                  </Grid>

                  {flagArmadilhaLuminosa && (
                    <>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="armadilhaLuminosa.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      {armadilhaLuminosaQuantidade > 0 && (
                        <>
                          <Grid size={{ xs: 12 }}>
                            <Switch
                              control={control}
                              name="armadilhaLuminosa.flagClienteExigeContagemInsetosPorArmadilha"
                              label="Cliente exige contagem de insetos por armadilha?"
                            />
                          </Grid>

                          {flagContagemInsetos && (
                            <>
                              <Grid size={{ xs: 12, md: 6 }}>
                                <Select
                                  label="Tipo de Contagem"
                                  name="armadilhaLuminosa.tipoContagem"
                                  control={control}
                                  propertyLabel="descricao"
                                  propertyValue="id"
                                  options={Object.values(TipoContagem).map(
                                    (value) => ({
                                      id: value,
                                      descricao: value,
                                    }),
                                  )}
                                />
                              </Grid>

                              <Grid size={{ xs: 12 }}>
                                {tipoContagem && (
                                  <Typography variant="subtitle1" gutterBottom>
                                    Contagem de Insetos
                                  </Typography>
                                )}

                                {tipoContagem === TipoContagem.TOTAL && (
                                  <ContagemTotal />
                                )}

                                {tipoContagem === TipoContagem.ESPECIE && (
                                  <ContagemEspecie />
                                )}
                              </Grid>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
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
                  <Grid size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="armadilhaFeromonio.flag"
                      label="Armadilha feromônio ativa?"
                    />
                  </Grid>

                  {flagArmadilhaFeromonio && (
                    <>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          control={control}
                          name="armadilhaFeromonio.quantidade"
                          label="Quantidade"
                          type="number"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Guachon"
                          property="armadilhaFeromonio.guachon"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <QuantidadeIdentificacao
                          title="Bio Serrico"
                          property="armadilhaFeromonio.bioSerrico"
                        />
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
