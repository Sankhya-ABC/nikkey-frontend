import axios, { AxiosResponse } from "axios";

import { api } from "../api";
import { GetAllPaginated, ParamsForPagination } from "../types";
import { Tecnico } from "./types";

class TecnicoService {
  async criarTecnico(tecnico: Omit<Tecnico, "id">): Promise<Tecnico> {
    try {
      const response: AxiosResponse<Tecnico> = await api.post(
        "/tecnicos",
        tecnico,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTodosTecnicos(
    params: ParamsForPagination,
  ): Promise<GetAllPaginated<Tecnico>> {
    try {
      const response = await api.get<GetAllPaginated<Tecnico>>("/tecnicos", {
        params,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async buscarTecnicoPorId(id: number): Promise<Tecnico> {
    try {
      const response: AxiosResponse<Tecnico> = await api.get(`/tecnicos/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarTecnico(tecnico: Partial<Tecnico>): Promise<Tecnico> {
    try {
      const response: AxiosResponse<Tecnico> = await api.put(
        `/tecnicos/${tecnico?.id}`,
        tecnico,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarStatusTecnico(id: number): Promise<Tecnico> {
    try {
      const response: AxiosResponse<Tecnico> = await api.patch(
        `/tecnicos/${id}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deletarTecnico(id: number): Promise<void> {
    try {
      await api.delete(`/tecnicos/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async pesquisarTecnicos(termo: string): Promise<Tecnico[]> {
    try {
      const response: AxiosResponse<Tecnico[]> = await api.get(
        `/tecnicos/search?q=${termo}`,
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

export const tecnicoService = new TecnicoService();
