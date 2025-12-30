import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { Dominio, GetAllPaginated, ParamsForPagination } from "../types";

class EquipamentoService {
  async criarEquipamento(equipamento: Omit<Dominio, "id">): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.post(
        "/equipamentos",
        equipamento,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosEquipamentos(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Dominio>> {
    try {
      const response = await api.get<GetAllPaginated<Dominio>>(
        "/equipamentos",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarEquipamentoPorId(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.get(
        `/equipamentos/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarEquipamento(equipamento: Partial<Dominio>): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.put(
        `/equipamentos/${equipamento?.id}`,
        equipamento,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusEquipamento(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.patch(
        `/equipamentos/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarEquipamento(id: number): Promise<void> {
    try {
      await api.delete(`/equipamentos/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarEquipamentos(termo: string): Promise<Dominio[]> {
    try {
      const response: AxiosResponse<Dominio[]> = await api.get(
        `/equipamentos/search?q=${termo}`,
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

export const equipamentoService = new EquipamentoService();
