import axios, { AxiosResponse } from "axios";

import { api } from "../../api";

import { OrdemDeServico } from "./types";

class OrdemDeServicoAdminService {
  async criarOrdemDeServico(
    ordemDeServico: Omit<OrdemDeServico, "id">,
  ): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.post(
        "/ordens-servico",
        ordemDeServico,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarOrdemDeServicoPorId(id: number): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.get(
        `/ordens-servico/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async imprimirOrdemDeServicoPorId(id: number): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.get(
        `/ordens-servico/downloads/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarOrdemDeServico(
    ordemDeServico: Partial<OrdemDeServico>,
  ): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.put(
        `/ordens-servico/${ordemDeServico?.numOS}`,
        ordemDeServico,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusOrdemDeServico(id: number): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.patch(
        `/ordens-servico/${id}`,
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

export const ordemDeServicoAdminService = new OrdemDeServicoAdminService();
