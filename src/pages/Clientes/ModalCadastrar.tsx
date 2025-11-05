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

interface ModalCadastrarProps {
  openCreateDialog: any;
  handleCloseCreateDialog: any;
}

export const ModalCadastrar: React.FC<ModalCadastrarProps> = ({
  openCreateDialog,
  handleCloseCreateDialog,
}) => {
  return (
    <Dialog
      open={openCreateDialog}
      onClose={handleCloseCreateDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle color="primary" variant="h5" fontWeight="bold">
        Cadastrar
      </DialogTitle>
      <DialogContent sx={{ overflow: "unset" }}>
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
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField
              size="small"
              fullWidth
              label="Nome Fantasia"
              variant="outlined"
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="CNPJ/CPF"
              placeholder="Apenas Números"
            />
          </Grid>

          <Grid item size={{ xs: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Validade do Certificado (Dias)"
              placeholder="DD/MM/AAAA"
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <TextField size="small" fullWidth label="Tipo de Atividade" />
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
            <FormControlLabel control={<Switch defaultChecked />} />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Endereço
            </Typography>
          </Grid>

          {/* Endereço */}
          <Grid item size={{ xs: 12 }}>
            <TextField size="small" fullWidth label="Logradouro" />
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <TextField size="small" fullWidth label="Número" />
          </Grid>

          <Grid item size={{ xs: 12, md: 9 }}>
            <TextField size="small" fullWidth label="Complemento" />
          </Grid>

          <Grid item size={{ xs: 6, md: 3 }}>
            <TextField size="small" fullWidth label="Bairro" />
          </Grid>

          <Grid item size={{ xs: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                label="Estado"
                defaultValue={"Acre"}
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
            <TextField size="small" fullWidth label="Cidade" />
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <TextField size="small" fullWidth label="CEP" />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Contato
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Contato" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Telefone" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Função" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Fax" />
          </Grid>

          <Grid item size={{ xs: 12, md: 8 }}>
            <TextField
              size="small"
              fullWidth
              label="E-mail"
              defaultValue="atendimento.sp@nikkey.com.br"
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
            />
          </Grid>

          <Grid item size={{ xs: 12 }}>
            <Typography variant="h6" color="primary">
              Dados de Acesso
            </Typography>
          </Grid>
          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField size="small" fullWidth label="Nome" />
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <TextField size="small" fullWidth label="E-mail" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Departamento" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField size="small" fullWidth label="Senha" type="password" />
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <TextField
              size="small"
              fullWidth
              label="Confirmar Senha"
              type="password"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseCreateDialog}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleCloseCreateDialog}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
