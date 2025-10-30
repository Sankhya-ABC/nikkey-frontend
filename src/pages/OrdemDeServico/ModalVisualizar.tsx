import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

interface ModalVisualizar {
  selectedOrdemDeServico: any;
  openViewDialog: any;
  handleCloseViewDialog: any;
}

export const ModalVisualizar: React.FC<ModalVisualizar> = ({
  selectedOrdemDeServico,
  openViewDialog,
  handleCloseViewDialog,
}) => {
  return (
    <Dialog
      open={openViewDialog}
      onClose={handleCloseViewDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Visualizar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados Básicos
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Razão Social
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.razaoSocial || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Nome Fantasia
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.nomeFantasia || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              CNPJ/CPF
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.documento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Validade do Certificado
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.validadeCertificado || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Tipo de Atividade
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.tipoAtividade || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Possui Contrato
            </Typography>
            <Chip
              label={selectedOrdemDeServico?.possuiContrato ? "Sim" : "Não"}
              color={
                selectedOrdemDeServico?.possuiContrato ? "success" : "default"
              }
              size="small"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Endereço
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Logradouro
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.logradouro || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Número
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.numero || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Complemento
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.complemento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Bairro
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.bairro || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Estado
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.estado || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Cidade
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.cidade || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              CEP
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.cep || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Contato
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.contato || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Telefone
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.telefone || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Função
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.funcao || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Fax
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.fax || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              E-mail
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.email || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Observações
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.observacoes ||
                "Nenhuma observação cadastrada"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados de Acesso
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Nome
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.nome || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              E-mail
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.emailAcesso || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Departamento
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.departamento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={selectedOrdemDeServico?.ativo ? "Ativo" : "Inativo"}
              color={selectedOrdemDeServico?.ativo ? "success" : "default"}
              size="small"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Data de Cadastro
            </Typography>
            <Typography variant="body1">
              {selectedOrdemDeServico?.dataCadastro || "Não informado"}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseViewDialog}>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
