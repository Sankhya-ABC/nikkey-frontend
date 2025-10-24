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
  selectedUser: any;
  openViewDialog: any;
  handleCloseViewDialog: any;
}

export const ModalVisualizar: React.FC<ModalVisualizar> = ({
  selectedUser,
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
      <DialogContent>
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
              {selectedUser?.razaoSocial || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Nome Fantasia
            </Typography>
            <Typography variant="body1">
              {selectedUser?.nomeFantasia || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              CNPJ/CPF
            </Typography>
            <Typography variant="body1">
              {selectedUser?.documento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Validade do Certificado
            </Typography>
            <Typography variant="body1">
              {selectedUser?.validadeCertificado || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Tipo de Atividade
            </Typography>
            <Typography variant="body1">
              {selectedUser?.tipoAtividade || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Possui Contrato
            </Typography>
            <Chip
              label={selectedUser?.possuiContrato ? "Sim" : "Não"}
              color={selectedUser?.possuiContrato ? "success" : "default"}
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
              {selectedUser?.logradouro || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Número
            </Typography>
            <Typography variant="body1">
              {selectedUser?.numero || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Complemento
            </Typography>
            <Typography variant="body1">
              {selectedUser?.complemento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Bairro
            </Typography>
            <Typography variant="body1">
              {selectedUser?.bairro || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Estado
            </Typography>
            <Typography variant="body1">
              {selectedUser?.estado || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Cidade
            </Typography>
            <Typography variant="body1">
              {selectedUser?.cidade || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              CEP
            </Typography>
            <Typography variant="body1">
              {selectedUser?.cep || "Não informado"}
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
              {selectedUser?.contato || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Telefone
            </Typography>
            <Typography variant="body1">
              {selectedUser?.telefone || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Função
            </Typography>
            <Typography variant="body1">
              {selectedUser?.funcao || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Fax
            </Typography>
            <Typography variant="body1">
              {selectedUser?.fax || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              E-mail
            </Typography>
            <Typography variant="body1">
              {selectedUser?.email || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Observações
            </Typography>
            <Typography variant="body1">
              {selectedUser?.observacoes || "Nenhuma observação cadastrada"}
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
              {selectedUser?.nome || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              E-mail
            </Typography>
            <Typography variant="body1">
              {selectedUser?.emailAcesso || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Departamento
            </Typography>
            <Typography variant="body1">
              {selectedUser?.departamento || "Não informado"}
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={selectedUser?.ativo ? "Ativo" : "Inativo"}
              color={selectedUser?.ativo ? "success" : "default"}
              size="small"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Data de Cadastro
            </Typography>
            <Typography variant="body1">
              {selectedUser?.dataCadastro || "Não informado"}
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
