import React from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

import { DatePicker } from "../../components/Form/DatePicker";
import { Select } from "../../components/Form/Select";
import { Switch } from "../../components/Form/Switch";
import { TextField } from "../../components/Form/Textfield";
import { TimePicker } from "../../components/Form/TimePicker";

interface ModalCadastrarProps {
  openCreateDialog: any;
  handleCloseCreateDialog: any;
}

interface OrdemDeServico {
  cliente: string;
  tecnico: string;
  dataVisita: Date | null;
  visitasPendentes: string;
  horaInicio: Date | null;
  horaFim: Date | null;
  responsavel: string;
  cargoResponsavel: string;
  servicoRealizado: boolean;
  motivoNaoRealizacao: string;
  evidenciasPragas: boolean;
  pragas: string | number;
  revisaoEquipamentos: boolean;
  oQueFoiVisualizado: string | number;
  quantidade: string;
  areaEncontrado: string;
  consumoProdutos: boolean;
  naoConformidades: boolean;
  uploadEvidencias: boolean;
  observacoes: string;
  revisaoIscagem: boolean;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({
  openCreateDialog,
  handleCloseCreateDialog,
}) => {
  const { control, watch } = useForm<OrdemDeServico>({
    defaultValues: {
      cliente: "",
      tecnico: "",
      dataVisita: null,
      visitasPendentes: false,
      horaInicio: null,
      horaFim: null,
      responsavel: "",
      cargoResponsavel: "",
      servicoRealizado: false,
      motivoNaoRealizacao: "",
      evidenciasPragas: false,
      pragas: "",
      revisaoEquipamentos: false,
      oQueFoiVisualizado: "",
      quantidade: "",
      areaEncontrado: "",
      consumoProdutos: false,
      naoConformidades: false,
      uploadEvidencias: false,
      observacoes: "",
      revisaoIscagem: false,
      quantidadePontos: "",
      quantidadePontosTrocadosPorMofoDeterioracao: "",
      identificacaoPonto: "",
      quantidadePontosTrocadosRoidos: "",
      revisaoPlacaColaArmadilhaMecanica: false,
    },
  });

  const servicoRealizado = watch("servicoRealizado");
  const evidenciasPragas = watch("evidenciasPragas");
  const revisaoEquipamentos = watch("revisaoEquipamentos");
  const revisaoIscagem = watch("revisaoIscagem");
  const quantidadePontosTrocados = watch(
    "quantidadePontosTrocadosPorMofoDeterioracao",
  );

  return (
    <Dialog
      open={openCreateDialog}
      onClose={handleCloseCreateDialog}
      maxWidth="md"
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Cadastrar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Informações Gerais
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} label="Cliente" name="cliente" />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField control={control} label="Técnico" name="tecnico" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <DatePicker
              label="Data Visita"
              name="dataVisita"
              control={control}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TimePicker
              label="Hora início"
              name="horaInicio"
              control={control}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TimePicker label="Hora fim" name="horaFim" control={control} />
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <TextField
              control={control}
              name="responsavel"
              label="Responsável"
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              control={control}
              name="cargoResponsavel"
              label="Cargo do responsável"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="visitasPendentes"
              label="Visitas pendentes"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Informações do Serviço
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Switch
              control={control}
              name="servicoRealizado"
              label="Serviço foi realizado?"
            />
          </Grid>

          {servicoRealizado ? (
            <>
              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="evidenciasPragas"
                  label="Houve evidências ou focos de pragas encontrados?"
                />
              </Grid>

              {evidenciasPragas && (
                <>
                  <Grid item size={{ xs: 12 }}>
                    <Select
                      name="pragas"
                      control={control}
                      label="Pragas"
                      options={[]}
                      propertyLabel="descricao"
                      propertyValue="id"
                    />
                  </Grid>

                  <Grid item size={{ xs: 12 }}>
                    <Select
                      name="oQueFoiVisualizado"
                      control={control}
                      label="O que foi visualizado?"
                      options={[]}
                      propertyLabel="descricao"
                      propertyValue="id"
                    />
                  </Grid>

                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      control={control}
                      name="quantidade"
                      label="Quantidade"
                    />
                  </Grid>

                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      control={control}
                      name="areaEncontrado"
                      label="Área onde foi encontrado"
                    />
                  </Grid>
                </>
              )}

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="revisaoEquipamentos"
                  label="Houve revisão de equipamentos?"
                />
              </Grid>

              {revisaoEquipamentos && (
                <>
                  <Grid item size={{ xs: 12 }}>
                    <Switch
                      control={control}
                      name="revisaoIscagem"
                      label="Houve revisão de iscagem?"
                    />
                  </Grid>

                  {revisaoIscagem ? (
                    <>
                      <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                          control={control}
                          name="quantidadePontos"
                          label="Quantidade de pontos"
                        />
                      </Grid>
                      <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                          control={control}
                          name="quantidadePontosTrocadosPorMofoDeterioracao"
                          label="Quantos pontos trocados por mofo ou deterioração?"
                        />
                      </Grid>
                      {Number(
                        watch("quantidadePontosTrocadosPorMofoDeterioracao"),
                      ) > 0 ? (
                        <Grid item size={{ xs: 12, md: 4 }}>
                          <TextField
                            control={control}
                            name="identificacaoPonto"
                            label="Identificação do ponto"
                          />
                        </Grid>
                      ) : null}
                      <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                          control={control}
                          name="quantidadePontosTrocadosRoidos"
                          label="Quantos pontos trocados por estarem roídos?"
                        />
                      </Grid>
                      {Number(watch("quantidadePontosTrocadosRoidos")) > 0 ? (
                        <Grid item size={{ xs: 12, md: 4 }}>
                          <TextField
                            control={control}
                            name="identificacaoPonto"
                            label="Identificação do ponto"
                          />
                        </Grid>
                      ) : null}

                      <Grid item size={{ xs: 12, md: 4 }}>
                        <TextField
                          control={control}
                          name="quantidadePontosObstruidosQuebradosExtraviados"
                          label="Quantos pontos obstruídos, quebrados e/ou extraviados?"
                        />
                      </Grid>
                      {Number(
                        watch("quantidadePontosObstruidosQuebradosExtraviados"),
                      ) > 0 ? (
                        <Grid item size={{ xs: 12, md: 4 }}>
                          <TextField
                            control={control}
                            name="identificacaoPonto"
                            label="Identificação do ponto"
                          />
                        </Grid>
                      ) : null}

                      <Grid item size={{ xs: 12 }}>
                        <Switch
                          control={control}
                          name="revisaoPlacaColaArmadilhaMecanica"
                          label="Houve revisão de placa de cola/Armadilha Mecânica?"
                        />
                      </Grid>
                      {watch("revisaoPlacaColaArmadilhaMecanica") ? (
                        <Grid item size={{ xs: 12, md: 4 }}>
                          <TextField
                            control={control}
                            name="quantidadePontos"
                            label="Quantidade de pontos"
                          />
                          <Grid item size={{ xs: 12, md: 4 }}>
                            <TextField
                              control={control}
                              name="quantidadePontosTrocadosPorSujeiraDeterioracao"
                              label="Quantos pontos trocados por sujeira ou deterioração?"
                            />
                          </Grid>
                          {Number(
                            watch(
                              "quantidadePontosTrocadosPorSujeiraDeterioracao",
                            ),
                          ) > 0 ? (
                            <Grid item size={{ xs: 12, md: 4 }}>
                              <TextField
                                control={control}
                                name="identificacaoPonto"
                                label="Identificação do ponto"
                              />
                            </Grid>
                          ) : null}

                          <Grid item size={{ xs: 12, md: 4 }}>
                            <TextField
                              control={control}
                              name="quantidadePontosTrocadosPorRoedorAderido"
                              label="Quantos pontos trocados por roedor aderido?"
                            />
                          </Grid>
                          {Number(
                            watch("quantidadePontosTrocadosPorRoedorAderido"),
                          ) > 0 ? (
                            <Grid item size={{ xs: 12, md: 4 }}>
                              <TextField
                                control={control}
                                name="identificacaoPonto"
                                label="Identificação do ponto"
                              />
                            </Grid>
                          ) : null}

                          <Grid item size={{ xs: 12, md: 4 }}>
                            <TextField
                              control={control}
                              name="quantidadePontosObstruidosQuebradosExtraviados"
                              label="Quantos pontos obstruídos, quebrados e/ou extraviados?"
                            />
                          </Grid>
                          {Number(
                            watch(
                              "quantidadePontosObstruidosQuebradosExtraviados",
                            ),
                          ) > 0 ? (
                            <Grid item size={{ xs: 12, md: 4 }}>
                              <TextField
                                control={control}
                                name="identificacaoPonto"
                                label="Identificação do ponto"
                              />
                            </Grid>
                          ) : null}
                        </Grid>
                      ) : null}
                    </>
                  ) : null}
                </>
              )}

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="revisaoArmadilhaLuminosa"
                  label="Houve revisão de armadilha luminosa?"
                />
              </Grid>
              {watch("revisaoArmadilhaLuminosa") ? (
                <Grid item size={{ xs: 12, md: 4 }}>
                  <TextField
                    control={control}
                    name="quantidadePontos"
                    label="Quantidade de pontos"
                  />
                </Grid>
              ) : null}

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="clienteExigeContagemInsetosPorArmadilha"
                  label="Cliente exige contagem de insetos por armadilha?"
                />
              </Grid>
              {watch("clienteExigeContagemInsetosPorArmadilha") ? (
                <>
                  <Grid item size={{ xs: 12 }}>
                    <Select
                      name="tipoContagem"
                      control={control}
                      label="Tipo de Contagem"
                      options={[
                        { codigo: "TOTAL", descricao: "Total" },
                        { codigo: "ESPECIE", descricao: "Espécie" },
                      ]}
                      propertyLabel="descricao"
                      propertyValue="codigo"
                    />
                  </Grid>
                  {watch("tipoContagem") === "TOTAL" ? <p>gride</p> : null}
                  {watch("tipoContagem") === "ESPECIE" ? <p>tabela</p> : null}
                </>
              ) : null}

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="revisaoArmadilhaFeromonio"
                  label="Houve revisão de armadilha de feromônio?"
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="consumoProdutos"
                  label="Houve consumo de produtos?"
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="naoConformidades"
                  label="Houveram não conformidades?"
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="uploadEvidencias"
                  label="Deseja realizar upload de evidências?"
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <TextField
                  control={control}
                  name="observacoes"
                  label="Observações"
                  rows={3}
                  multiline
                />
              </Grid>
            </>
          ) : (
            <Grid item size={{ xs: 12 }}>
              <TextField
                control={control}
                name="motivoNaoRealizacao"
                label="Motivo da não realização"
                rows={3}
                multiline
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCreateDialog}>Cancelar</Button>
        <Button variant="contained" onClick={handleCloseCreateDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
