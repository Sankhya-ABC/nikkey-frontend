import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { GetAllPaginated, ParamsForPagination } from "../types";
import { CronogramaDeVisita } from "./types";

class CronogramaDeVisitaService {
  async criarCronogramaDeVisita(
    cronogramaDeVisita: Omit<CronogramaDeVisita, "id">,
  ): Promise<CronogramaDeVisita> {
    try {
      const response: AxiosResponse<CronogramaDeVisita> = await api.post(
        "/cronogramas-de-visita",
        cronogramaDeVisita,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosCronogramasDeVisita(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<CronogramaDeVisita>> {
    try {
      const response = await api.get<GetAllPaginated<CronogramaDeVisita>>(
        "/cronogramas-de-visita",
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarCronogramaDeVisitaPorId(id: number): Promise<CronogramaDeVisita> {
    try {
      const response: AxiosResponse<CronogramaDeVisita> = await api.get(
        `/cronogramas-de-visita/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarCronogramaDeVisita(
    cronogramaDeVisita: Partial<CronogramaDeVisita>,
  ): Promise<CronogramaDeVisita> {
    try {
      const response: AxiosResponse<CronogramaDeVisita> = await api.put(
        `/cronogramas-de-visita/${cronogramaDeVisita?.id}`,
        cronogramaDeVisita,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusCronogramaDeVisita(
    id: number,
  ): Promise<CronogramaDeVisita> {
    try {
      const response: AxiosResponse<CronogramaDeVisita> = await api.patch(
        `/cronogramas-de-visita/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarCronogramaDeVisita(id: number): Promise<void> {
    try {
      await api.delete(`/cronogramas-de-visita/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarCronogramasDeVisita(
    termo: string,
  ): Promise<CronogramaDeVisita[]> {
    try {
      const response: AxiosResponse<CronogramaDeVisita[]> = await api.get(
        `/cronogramas-de-visita/search?q=${termo}`,
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

export const cronogramaDeVisitaService = new CronogramaDeVisitaService();
