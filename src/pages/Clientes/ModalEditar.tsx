import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { estados } from "./provider";

interface ModalEditarProps {
  selectedUser: any;
  openEditDialog: any;
  handleCloseEditDialog: any;
}

export const ModalEditar: React.FC<ModalEditarProps> = ({
  selectedUser,
  openEditDialog,
  handleCloseEditDialog,
}) => {
  return (
    <Dialog
      open={openEditDialog}
      onClose={handleCloseEditDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Editar
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados Básicos
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="Razão Social"
              variant="outlined"
              defaultValue={selectedUser?.razaoSocial || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="Nome Fantasia"
              variant="outlined"
              defaultValue={selectedUser?.nomeFantasia || ""}
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="CNPJ/CPF"
              placeholder="Apenas Números"
              defaultValue={selectedUser?.documento || ""}
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Validade do Certificado (Dias)"
              placeholder="DD/MM/AAAA"
              defaultValue={selectedUser?.validadeCertificado || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="Tipo de Atividade"
              defaultValue={selectedUser?.tipoAtividade || ""}
            />
          </Grid>

          <Grid
            item
            size={{ xs: 12 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ mr: 2, minWidth: 140 }}>
              <Typography color="text.secondary">
                Cliente possui contrato?
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={selectedUser?.possuiContrato || false}
                />
              }
              label=""
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Endereço
            </Typography>
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="Logradouro"
              defaultValue={selectedUser?.logradouro || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <TextField
              size="small"
              fullWidth
              label="Número"
              defaultValue={selectedUser?.numero || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 9 }}>
            <TextField
              size="small"
              fullWidth
              label="Complemento"
              defaultValue={selectedUser?.complemento || ""}
            />
          </Grid>

          <Grid item size={{ xs: 6, md: 3 }}>
            <TextField
              size="small"
              fullWidth
              label="Bairro"
              defaultValue={selectedUser?.bairro || ""}
            />
          </Grid>

          <Grid item size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                label="Estado"
                defaultValue={selectedUser?.estado || "Acre"}
                size="small"
              >
                {estados?.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <TextField
              size="small"
              fullWidth
              label="Cidade"
              defaultValue={selectedUser?.cidade || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <TextField
              size="small"
              fullWidth
              label="CEP"
              defaultValue={selectedUser?.cep || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Contato
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Contato"
              defaultValue={selectedUser?.contato || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Telefone"
              defaultValue={selectedUser?.telefone || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Função"
              defaultValue={selectedUser?.funcao || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Fax"
              defaultValue={selectedUser?.fax || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <TextField
              size="small"
              fullWidth
              label="E-mail"
              defaultValue={
                selectedUser?.email || "atendimento.sp@nikkey.com.br"
              }
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="Observações"
              multiline
              rows={4}
              placeholder="Anotações sobre o cliente"
              defaultValue={selectedUser?.observacoes || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados de Acesso
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Nome"
              defaultValue={selectedUser?.nome || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="E-mail"
              defaultValue={selectedUser?.emailAcesso || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Departamento"
              defaultValue={selectedUser?.departamento || ""}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Senha"
              type="password"
              placeholder="Manter senha atual"
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Confirmar Senha"
              type="password"
              placeholder="Manter senha atual"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseEditDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleCloseEditDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
