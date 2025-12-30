import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { GetAllPaginated, ParamsForPagination } from "../types";

import { Certificado } from "./types";

class CertificadoService {
  async buscarTodosCertificados(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Certificado>> {
    try {
      const response = await api.get<GetAllPaginated<Certificado>>(
        "/certificados",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async imprimirCertificadoPorId(id: number): Promise<Certificado> {
    try {
      const response: AxiosResponse<Certificado> = await api.get(
        `/certificados/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return new Error("Erro desconhecido");
  }
}

export const certificadoService = new CertificadoService();
