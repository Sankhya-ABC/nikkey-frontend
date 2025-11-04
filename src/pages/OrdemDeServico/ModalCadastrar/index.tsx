import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useForm } from "react-hook-form";
import { DatePicker } from "../../../components/Form/DatePicker";
import { Select } from "../../../components/Form/Select";
import { Switch } from "../../../components/Form/Switch";
import { TextField } from "../../../components/Form/Textfield";
import { TimePicker } from "../../../components/Form/TimePicker";
import { ComoEncontrado, OrdemServico } from "../type";

const defaultValues: OrdemServico = {
  idCliente: "",
  idTecnico: "",
  data: {
    data: null,
    horaInicio: null,
    horaFinal: null,
  },
  responsavel: {
    nome: "",
    cargo: "",
  },
  flagPossuiVisitaPendente: false,

  flagServicoRealizado: false,
  motivoNaoRealizacao: "",

  flagEvidenciasOuFocosPragas: false,
  pragas: [],

  flagRevisaoEquipamentos: false,

  iscagem: {
    flag: false,
    quantidade: "",
    mofoDeterioracao: {
      quantidade: "",
      identificacao: [],
    },
    roido: {
      quantidade: "",
      identificacao: [],
    },
    obstruidoQuebradoExtraviado: {
      quantidade: "",
      identificacao: [],
    },
  },

  placaColaArmadilhaMecanica: {
    flag: false,
    quantidade: "",
    sujeiraDeterioracao: {
      quantidade: "",
      identificacao: [],
    },
    roedorAderido: {
      quantidade: "",
      identificacao: [],
    },
    obstruidoQuebradoExtraviado: {
      quantidade: "",
      identificacao: [],
    },
  },

  armadilhaLuminosa: {
    flag: false,
    flagClienteExigeContagemInsetosPorArmadilha: false,
    tipoContagem: "",
    contagem: [],
  },

  armadilhaFeromonio: {
    flag: false,
    quantidade: "",
    guachon: {
      quantidade: "",
      identificacao: [],
    },
    bioSerrico: {
      quantidade: "",
      identificacao: [],
    },
  },

  flagConsumoProdutos: false,
  consumo: [],

  areaLocal: "",
  naoConformidade: "",
  acaoSugerida: "",

  naoConformidades: {
    flag: false,
    naoConformidades: [],
  },
  observacoes: "",

  flagUploadEvidencias: false,
  uploads: [],
};

interface ModalCadastrarProps {
  openCreateDialog: any;
  handleCloseCreateDialog: any;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({
  openCreateDialog,
  handleCloseCreateDialog,
}) => {
  const { control, watch, handleSubmit } = useForm<OrdemServico>({
    defaultValues,
  });

  const flagServicoRealizado = watch("flagServicoRealizado");
  const flagEvidenciasPragas = watch("flagEvidenciasOuFocosPragas");
  const flagConsumoProdutos = watch("flagConsumoProdutos");
  const flagNaoConformidades = watch("naoConformidades.flag");
  const flagUploadEvidencias = watch("flagUploadEvidencias");

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const listClientes = [
    { id: 1, descricao: "Cliente A" },
    { id: 2, descricao: "Cliente B" },
  ];

  const listTecnicos = [
    { id: 1, descricao: "Técnico 1" },
    { id: 2, descricao: "Técnico 2" },
  ];

  const listPragas = [
    { id: 1, descricao: "Barata" },
    { id: 2, descricao: "Rato" },
    { id: 3, descricao: "Formiga" },
  ];

  const listProdutos = [
    { id: 1, descricao: "Produto A" },
    { id: 2, descricao: "Produto B" },
  ];

  const listEquipamentos = [
    { id: 1, descricao: "Equipamento 1" },
    { id: 2, descricao: "Equipamento 2" },
  ];

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Informações Gerais
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Select
                  label="Cliente"
                  name="informacoesGerais.idCliente"
                  control={control}
                  propertyLabel="descricao"
                  propertyValue="id"
                  options={listClientes}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <Select
                  label="Técnico"
                  name="informacoesGerais.idTecnico"
                  control={control}
                  propertyLabel="descricao"
                  propertyValue="id"
                  options={listTecnicos}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <DatePicker
                  label="Data Visita"
                  name="informacoesGerais.data.data"
                  control={control}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TimePicker
                  label="Hora início"
                  name="informacoesGerais.data.horaInicio"
                  control={control}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4 }}>
                <TimePicker
                  label="Hora final"
                  name="informacoesGerais.data.horaFinal"
                  control={control}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  control={control}
                  name="informacoesGerais.responsavel.nome"
                  label="Nome do Responsável"
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 6 }}>
                <TextField
                  control={control}
                  name="informacoesGerais.responsavel.cargo"
                  label="Cargo do Responsável"
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="informacoesGerais.flagPossuiVisitaPendente"
                  label="Possui visita pendente?"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Informações Básicas do Serviço
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="flagServicoRealizado"
                  label="Serviço realizado?"
                />
              </Grid>

              {!flagServicoRealizado && (
                <Grid item size={{ xs: 12 }}>
                  <TextField
                    control={control}
                    name="motivoNaoRealizacao"
                    label="Motivo da não realização"
                    multiline
                    rows={3}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
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
                              options={Object.values(ComoEncontrado).map(
                                (value) => ({
                                  id: value,
                                  descricao: value,
                                }),
                              )}
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

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
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
                          <TableCell>
                            <Select
                              label="Produto"
                              name="consumo.0.idProduto"
                              control={control}
                              propertyLabel="descricao"
                              propertyValue="id"
                              options={listProdutos}
                            />
                          </TableCell>
                          <TableCell>
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
                          <TableCell>
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
                  <Button startIcon={<Add />} sx={{ mt: 1 }}>
                    Adicionar Consumo
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
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

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Upload de Evidências
            </Typography>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12 }}>
                <Switch
                  control={control}
                  name="flagUploadEvidencias"
                  label="Upload de evidências?"
                />
              </Grid>

              {flagUploadEvidencias && (
                <Grid item size={{ xs: 12 }}>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          <Button type="submit" variant="contained" size="large">
            Salvar
          </Button>
        </form>
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
