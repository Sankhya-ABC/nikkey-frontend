import { Grid } from "@mui/material";

import { Layout } from "@/components/Template/Layout";

import { ConsultaCertificado } from "./ConsultaCertificado";

export const Certificados = () => {
  return (
    <Layout title="Certificados">
      <Grid size={{ xs: 12 }}>
        <ConsultaCertificado />
      </Grid>
    </Layout>
  );
};
