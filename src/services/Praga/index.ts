import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { Dominio, GetAllPaginated, ParamsForPagination } from "../types";

class PragaService {
  async criarPraga(praga: Omit<Dominio, "id">): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.post("/pragas", praga);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodasPragas(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Dominio>> {
    try {
      const response = await api.get<GetAllPaginated<Dominio>>("/pragas", {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarPragaPorId(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.get(`/pragas/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarPraga(praga: Partial<Dominio>): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.put(
        `/pragas/${praga?.id}`,
        praga,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusPraga(id: number): Promise<Dominio> {
    try {
      const response: AxiosResponse<Dominio> = await api.patch(`/pragas/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarPraga(id: number): Promise<void> {
    try {
      await api.delete(`/pragas/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarPragas(termo: string): Promise<Dominio[]> {
    try {
      const response: AxiosResponse<Dominio[]> = await api.get(
        `/pragas/search?q=${termo}`,
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

export const pragaService = new PragaService();
