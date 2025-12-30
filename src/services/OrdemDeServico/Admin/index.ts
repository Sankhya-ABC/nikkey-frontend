import axios, { AxiosResponse } from "axios";

import { api } from "../../api";
import { GetAllPaginated, ParamsForPagination } from "../../types";

import { OrdemDeServico } from "./types";

class OrdemDeServicoService {
  async criarOrdemDeServico(
    ordemDeServico: Omit<OrdemDeServico, "id">,
  ): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.post(
        "/ordens-de-servico",
        ordemDeServico,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodasOrdensDeServico(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<OrdemDeServico>> {
    try {
      const response = await api.get<GetAllPaginated<OrdemDeServico>>(
        "/ordens-de-servico",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarOrdemDeServicoPorId(id: number): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.get(
        `/ordens-de-servico/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async imprimirOrdemDeServicoPorId(id: number): Promise<OrdemDeServico> {
    try {
      const response: AxiosResponse<OrdemDeServico> = await api.get(
        `/ordens-de-servico/${id}`,
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
        `/ordens-de-servico/${ordemDeServico?.id}`,
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
        `/ordens-de-servico/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarOrdemDeServico(id: number): Promise<void> {
    try {
      await api.delete(`/ordens-de-servico/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarOrdensDeServico(termo: string): Promise<OrdemDeServico[]> {
    try {
      const response: AxiosResponse<OrdemDeServico[]> = await api.get(
        `/ordens-de-servico/search?q=${termo}`,
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

export const ordemDeServicoService = new OrdemDeServicoService();
